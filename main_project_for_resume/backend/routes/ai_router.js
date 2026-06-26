const express = require("express");
const { verifyToken } = require("../services/jwt_token");

const aiRouter = express.Router();

const AI_ENGINE_URL = "http://localhost:8001";

///////////////////////////////////////////////////////////

aiRouter.post("/analyze-symptoms", async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        try {
            verifyToken(token);
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token."
            });
        }

        const { symptoms } = req.body;

        if (!symptoms || !symptoms.trim()) {
            return res.status(400).json({
                success: false,
                message: "Symptoms text is required."
            });
        }

        const aiResponse = await fetch(`${AI_ENGINE_URL}/analyze-symptoms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ symptoms }),
        });

        if (!aiResponse.ok) {
            throw new Error("AI engine could not process the symptoms.");
        }

        const analysis = await aiResponse.json();

        return res.status(200).json({
            success: true,
            message: "Symptoms analyzed successfully",
            analysis
        });

    } catch (error) {

        console.log("AI ANALYZE ERROR:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

///////////////////////////////////////////////////////////

module.exports = aiRouter;
