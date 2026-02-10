const express=require('express');
const app=express();
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session = require('express-session');
require('dotenv').config(); // Load environment variables from .env file
// require schema
const Listing=require('./models/listings');
// for ejs
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// to get the data from url
app.use(express.urlencoded({extended:true}));
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
app.use(cors({
  origin: "http://localhost:8080", // your React frontend port
  credentials: true
}));

const wrapAsync = require("./public/util/WrapAsync.js");
const { Console } = require('console');

const MONGO_URL="mongodb://127.0.0.1:27017/CampusMarket";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err)});
// main fxn to connect to DB
async function main() {
    await mongoose.connect(MONGO_URL);
}
const sessionOptions={
    secret:"BMSCE",
    resave:false,
    saveUninitialized: true,
    Cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        
    },
};
app.use(session(sessionOptions));
app.use(express.json()); 
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;
  const newUser = new User({ name, phone, email });
  try {
    const registeredUser = await User.register(newUser, password);
    res.status(201).json({ message: "User registered", user: registeredUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post("/login", passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: "Login successful", user: req.user });
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out successfully" });
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

app.post("/new", async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!image || !title || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required including image URL.' });
    }

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      image, 
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
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


app.listen(5000,()=>{
    console.log("server is running");
})
