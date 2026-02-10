const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categoryEnum = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Accessories",
  "Sports",
  "Other"
];

const listing = new schema({
    title: String,
    description: String,
    price: Number,
    category: {
    type: String,
    enum: categoryEnum,
    required: true
  },
  image: String,
    owner: {
    type: schema.Types.ObjectId,
    ref: "User"
  },
  status: { type: String, default: "active" },
  datePosted: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Listing", listing);
