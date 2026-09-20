import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Contact from "./models/Contact.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/submit-contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            message: "Contact submitted successfully!",
            contact
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch contacts",
            error: error.message
        });
    }
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
