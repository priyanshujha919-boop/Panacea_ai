const mongoose = require("mongoose");

const appointmentsDoctorSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true
    },
    
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["upcoming", "completed", "cancelled"],
        default: "upcoming",
    }
}, { timestamps: true });

module.exports = mongoose.model("DoctorAppointments", appointmentsDoctorSchema);