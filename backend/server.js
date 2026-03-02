// ─── Environment ────────────────────────────────────────────────────────────
require("dotenv").config();

const REQUIRED_ENV = ["MONGO_URL", "SESSION_SECRET", "FRONTEND_URL"];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`❌  Missing required environment variables: ${missing.join(", ")}`);
  console.error("   Set them in .env (local) or in the Render dashboard (production).");
  process.exit(1);
}

// ─── Dependencies ───────────────────────────────────────────────────────────
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const path = require("path");

// connect-mongo v4/v5/v6 – handle CJS/ESM interop
const _connectMongo = require("connect-mongo");
const MongoStore = _connectMongo.default || _connectMongo;

// Models
const Listing = require("./models/listings");
const User = require("./models/User");

// ─── Express app ────────────────────────────────────────────────────────────
const app = express();

// Trust Render's reverse proxy (required for secure cookies)
app.set("trust proxy", 1);

// ─── CORS – safe production config ─────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ─── Body parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Static files ───────────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));

// ─── Session + Mongo store ──────────────────────────────────────────────────
const MONGO_URL = process.env.MONGO_URL;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60, // 7 days
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

// ─── Passport ───────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ─── Auth routes ────────────────────────────────────────────────────────────

app.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;
  const newUser = new User({ name, phone, email });
  try {
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Registered but auto-login failed" });
      }
      req.session.save((err) => {
        if (err) return res.status(500).json({ message: "Session save failed" });
        return res.status(201).json({ message: "User registered", user: registeredUser });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: info?.message || "Invalid email or password" });
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      req.session.save((err) => {
        if (err) return res.status(500).json({ message: "Session save failed" });
        return res.status(200).json({ message: "Login successful", user: req.user });
      });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// ─── User routes ────────────────────────────────────────────────────────────

app.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.status(401).json({ message: "Not authenticated" });
});

app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true, user: req.user });
  }
  return res.json({ isAuthenticated: false });
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.status(401).json({ message: "Not authenticated" });
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// ─── Listing routes ─────────────────────────────────────────────────────────

app.post("/new", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized. Please log in." });
  const { title, description, price, category, image } = req.body;
  if (!image || !image.startsWith("http")) {
    return res.status(400).json({ message: "Invalid image URL" });
  }
  try {
    const newListing = new Listing({ title, description, price, category, image, owner: req.user._id });
    await newListing.save();
    res.status(201).json({ message: "Listing created successfully", listing: newListing });
  } catch (err) {
    res.status(500).json({ message: "Error saving listing", error: err.message });
  }
});

app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({ status: "active" });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching listings" });
  }
});

app.get("/listing/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/mylistings", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not logged in" });
  Listing.find({ owner: req.user._id })
    .then((listings) => res.json(listings))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/marksold/:id", async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { status: "sold" });
    res.status(200).json({ message: "Listing Marked as Sold" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as sold" });
  }
});

app.delete("/listing/:id", async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete listing" });
  }
});

// ─── Global error handler ───────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

// ─── Start server only after MongoDB connects ──────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅  Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀  Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });
