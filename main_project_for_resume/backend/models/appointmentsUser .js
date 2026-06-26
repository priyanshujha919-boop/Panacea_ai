const mongoose = require("mongoose");

const userAppointmentsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true
    },
  
    status: {
        type: String,
        required: true,
        enum: ["upcoming", "completed", "cancelled"], 
        default: "upcoming",
    },
    mobileNumber: {
        type: Number,
        required: false, 
    }
}, { timestamps: true }); 

module.exports = mongoose.model("UserAppointments", userAppointmentsSchema);