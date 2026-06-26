const express = require("express");
const Doctor = require("../models/doctors");
const { verifyToken } = require("../services/jwt_token");

const doctorRouter = express.Router();

///////////////////////////////////////////////////////////

doctorRouter.get("/register", (req, res) => {
    res.render("doctor-register.ejs", {
        error: ""
    });
});


///////////////////////////////////////////////////////////

doctorRouter.post("/register", async (req, res) => {

    try {

        const {
            firstName,
            email,
            password,
            phone,
            specialization,
            qualification,
            experience,
            hospitalName,
            address
        } = req.body;

        const existingDoctor = await Doctor.findOne({ email });

        if (existingDoctor) {
            return res.json({
            success : false ,
            message : "user exist",
        });
        }

       const doctor = await Doctor.create({
            firstName,
            email,
            password,
            phone,
            specialization,
            qualification,
            experience,
            hospitalName,
            address
            });


        return res.json({
            success : true ,
            message : "user created",
        });

    } catch (error) {
            console.log("DOCTOR CREATE ERROR:", error.message);

            return res.json({
                success: false,
                message: error.message,
            });
}
});


///////////////////////////////////////////////////////////

doctorRouter.get("/enter", (req, res) => {
    res.render("doctor-enter.ejs", {
        error: ""
    });
});


///////////////////////////////////////////////////////////

doctorRouter.post("/enter", async (req, res) => {

    try {

        const { email, password } = req.body;

        const token =
            await Doctor.verifyDoctorAndCreateToken(
                email,
                password
            );

        return res
            .cookie("doctorToken", token)
            .json({
                success: true,
                message: "Entry Successfull"
            });

    } catch (error) {

        return res.json({
            success: false,
            message: "Incorrect Email or Password"
        });
    }
});

doctorRouter.post("/home", async (req, res) => {
  try {
    const { doctor } = req.body;

    const allDoctors = await Doctor.find({
      specialization: doctor
    });

    return res.json({
      success: true,
      doctors: allDoctors
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
});


doctorRouter.get("/getdata/:id", async (req, res) => {
     try {
            const id = req.params.id;
    
            const doctors = await Doctor.findOne({
                _id : id 
            });
    
            if (!doctors) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                });
            }
    
            return res.status(200).json({
                success: true,
                doctors
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
});

///////////////////////////////////////////////////////////

doctorRouter.get("/getdata", async (req, res) => {
    const token = req.cookies.doctorToken;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const payload = verifyToken(token);

        const requiredDoctor = await Doctor.findById(payload._id);

        if (!requiredDoctor) {
            return res.status(404).json({ error: "Doctor not found in database." });
        }

        requiredDoctor.password = undefined;

        return res.json(requiredDoctor);

    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
});

///////////////////////////////////////////////////////////

module.exports = doctorRouter;