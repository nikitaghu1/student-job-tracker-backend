import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobs.js";
// Load environment variables from .env
dotenv.config();

const app = express(); // ✅ Must be initialized BEFORE using it
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // No slash at end
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected..."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/jobs", jobRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
