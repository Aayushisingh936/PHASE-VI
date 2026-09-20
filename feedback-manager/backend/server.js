import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("../frontend"));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.post("/submit-feedback", async (req, res) => {

    try {
        const { name, rating, comment } = req.body;
        const feedback = new Feedback({
            name,
            rating,
            comment
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: "Failed to submit feedback"
        });

    }
});

app.get("/feedback", async (req, res) => {

    try {
        const feedback = await Feedback.find();
        res.json(feedback);

    } catch (error) {

        res.status(500).json({
            error: "Failed to fetch feedback"
        });

    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

