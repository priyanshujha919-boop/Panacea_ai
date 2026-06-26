const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/jwt_token");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    location: {
        type: String,
        default: "India"
    }

}, { timestamps: true });

/////////////////////////////////////////////////////////////////////////

UserSchema.pre("save", async function () {

    const user = this;

    if (!user.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
});

////////////////////////////////////////////////////////////////////////////////////////////

UserSchema.statics.verifyUserAndCreateToken = async function (email, password) {

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Incorrect Password");
    }

    const token = createToken(user);

    return token;
};

///////////////////////////////////////////////////////////

module.exports = mongoose.model("User", UserSchema);