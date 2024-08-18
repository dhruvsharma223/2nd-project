const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },
    number: {
        type: String,  // Changed to String to validate length
        required: true,
        validate(value) {
            if (!validator.isLength(value, { min: 10, max: 10 })) {
                throw new Error("Phone number must be 10 digits long");
            }
        }
    },
    message: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
