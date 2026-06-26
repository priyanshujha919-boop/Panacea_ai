const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../services/jwt_token");

const userRouter = express.Router();

userRouter.get("/register" , (req,res)=>{
    res.render("register.ejs");
})

////////////////////////////////////////////////////////////////////////
userRouter.post("/register", async (req, res) => {

    try {

        const { firstName, email, password, location } = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("register.ejs", {
                error: "Email already registered"
            });
        }

        await User.create({
            firstName,
            email,
            password,
            location,
        });

        return res.json({
            success: true,
            message: "User registered",
        }
        );

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "User not registered",}
        );
    }
});


////////////////////////////////////////////////////////////
userRouter.get("/enter", (req, res) => {
    res.render("enter.ejs", {
        error: []
    });
});

///////////////////////////////////////////////////////////
// Note the 'async' keyword added here so we can use 'await' inside
userRouter.get("/getdata", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const payload = verifyToken(token);

        const requiredUser = await User.findById(payload._id); 

        if (!requiredUser) {
            return res.status(404).json({ error: "User not found in database." });
        }

        requiredUser.password = undefined; 

        return res.json(requiredUser);

    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
});

////////////////////////////////////////////////////////////////////////////////
userRouter.post("/enter", async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.verifyUserAndCreateToken(email, password);

        return res.cookie("token" , token).json({
            success: true,
            message: "Entry Successfull"
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Wrong Email Or Password"
        });
    }
});

///////////////////////////////////////////////////////////
userRouter.get("/getdata/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({
            _id : id
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.password = undefined;

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = userRouter ;