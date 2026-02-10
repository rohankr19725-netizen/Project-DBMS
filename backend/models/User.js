const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/ // Ensures a valid 10-digit phone number
    },
    email: {
        type: String,
        required: true,
    }
});

// Passport-local-mongoose will auto-generate username and hashed password
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


module.exports = mongoose.model("User", userSchema);
