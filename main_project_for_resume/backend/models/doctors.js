const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/jwt_token");

const DoctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
    },

    specialization: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        required: true
    },

    hospitalName: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        default: "India"
    },

    address: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "DOCTOR"
    }

}, { timestamps: true });

DoctorSchema.pre("save", async function () {
    const doctor = this;

    if (!doctor.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(doctor.password, salt);

    doctor.password = hash;
});

DoctorSchema.statics.verifyDoctorAndCreateToken = async function (email, password) {
    const doctor = await this.findOne({ email });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
        throw new Error("Incorrect Password");
    }

    const token = createToken(doctor);

    return token;
};

module.exports = mongoose.model("Doctor", DoctorSchema);