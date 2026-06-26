const express = require("express");
const appointmentRouter = express.Router();
const DoctorAppointments = require("../models/appointments_doctor"); 
const UserAppointments = require("../models//appointmentsUser ")

appointmentRouter.post("/book", async (req, res) => {
    try {
        const { doctorId, patientId } = req.body;

        if (!doctorId || !patientId) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const appointment = await DoctorAppointments.create({
            doctorId,
            patientId,
        });

        return res.status(201).json({
            success: true,
            message: "Appointment created successfully on doctor panel!",
            appointment
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

appointmentRouter.post("/user", async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;

        if (!patientId || !doctorId) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const appointment = await UserAppointments.create({
            patientId, 
            doctorId,
        });

        return res.status(201).json({
            success: true,
            message: "Appointment synced to user history!",
            appointment
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

appointmentRouter.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const appointments = await UserAppointments.find({
            patientId : id 
        });

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            appointments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

appointmentRouter.get("/doctor/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const appointments = await DoctorAppointments.find({
            doctorId : id 
        });

        if (!appointments) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            appointments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

appointmentRouter.put("/cancel/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const userAppointment = await UserAppointments.findByIdAndUpdate(
            id,
            { status: "cancelled" },
            { new: true }
        );

        if (!userAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        await DoctorAppointments.findOneAndUpdate(
            {
                doctorId: userAppointment.doctorId,
                patientId: userAppointment.patientId,
            },
            { status: "cancelled" }
        );

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            appointment: userAppointment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = appointmentRouter;