import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add new job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

// Update job status
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updatedJob);
});

// Delete job
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

export default router;
