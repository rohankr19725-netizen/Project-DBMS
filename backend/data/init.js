const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing=require('../models/listings');

// Function to connect to MongoDB
async function main() {
  try {
    const MONGO_URL = "mongodb://127.0.0.1:27017/CampusMarket";
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

// Function to initialize the database
const initDB= async ()=>{
    await Listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=>({...obj,owner:'68296f04bbacee917e6ca9b2'}))
    await Listing.insertMany(initdata.data);
    console.log("Data saved in DB")
};

// Call main and initialize DB
main()
  .then(() => initDB())
  .catch((err) => console.error(err));
