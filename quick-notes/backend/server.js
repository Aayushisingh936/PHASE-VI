import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Note from "./models/Note.js";

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

app.post("/notes", async (req, res) => {

    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content
        });

        await note.save();

        res.status(201).json({
            message: "Note saved successfully"
        });

    } catch (error) {
        console.log("Save note error:", error.message);

        res.status(500).json({
            error: "Failed to save note"
        });

    }
});

app.get("/notes", async (req, res) => {

    try {
        const notes = await Note.find();
        res.json(notes);

    } catch (error) {
        console.log("Fetch notes error:", error.message);

        res.status(500).json({
            error: "Failed to fetch notes"
        });

    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});