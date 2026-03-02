const express=require('express');
const app=express();
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); // Load environment variables from .env file
// require schema
const Listing=require('./models/listings');
// for ejs
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// Body parsing is configured below with session middleware
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
const upload = require('./public/util/multer');
// to use post as put method
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
// ejs-mate
const ejsmate=require("ejs-mate");
app.engine("ejs",ejsmate);
// to use static file it should be save in public folder only
app.use(express.static(path.join(__dirname,"public")));

// passport
const User = require('./models/User.js');  
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cors = require('cors');

// Production-safe CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Required for secure cookies behind Render's reverse proxy
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const wrapAsync = require("./public/util/WrapAsync.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/CampusMarket";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err)});
// main fxn to connect to DB
async function main() {
    await mongoose.connect(MONGO_URL);
}
const sessionOptions={
    secret: process.env.SESSION_SECRET || "BMSCE",
    resave:false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60, // 7 days in seconds
    }),
    cookie:{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
};

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;
  const newUser = new User({ name, phone, email });
  try {
    const registeredUser = await User.register(newUser, password);
    // Auto-login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Registered but auto-login failed" });
      }
      return res.status(201).json({ message: "User registered", user: registeredUser });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: info?.message || "Invalid email or password" });
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      return res.status(200).json({ message: "Login successful", user: req.user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


app.post('/new', async (req, res) => {
  const { title, description, price, category, image } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  if (!image || !image.startsWith("http")) {
    return res.status(400).json({ message: "Invalid image URL" });
  }
  const newListing = new Listing({
    title,
    description,
    price,
    category,
    image,
    owner: req.user._id,
  });

  try {
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully', listing: newListing });
  } catch (err) {
    res.status(500).json({ message: 'Error saving listing', error: err.message });
  }
});

app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// /me route — returns current logged-in user (used by AuthContext)
app.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  return res.status(401).json({ message: "Not authenticated" });
});


app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({status:"active"}); // Adjust this based on your schema
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching listings" });
  }
});

app.get('/listing/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Assuming you have a UserModel
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

app.get("/mylistings", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }

  Listing.find({ owner: req.user._id })
    .then((listings) => res.json(listings))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user); // passport puts user in req.user
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
});



app.post('/marksold/:id', async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { status: 'sold' });
    res.status(200).json({ message: 'Listing Marked as Sold' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark as sold' });
  }
});

app.delete('/listing/:id', async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Failed to delete listing' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
