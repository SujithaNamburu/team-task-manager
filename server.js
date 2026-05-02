console.log("🔥 NEW SERVER FILE LOADED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("✅ MongoDB Connected (LOCAL)"))
  .catch(err => console.log("❌ Error:", err));

// Import Model
const Task = require("./models/Task");

// ✅ DEBUG ROUTE
app.get("/test", (req, res) => {
  console.log("✅ TEST ROUTE HIT");
  res.send("Test working");
});

// ================= CRUD APIs =================

// CREATE
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ
app.get("/tasks", async (req, res) => {
  console.log("🔥 /tasks route hit");

  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE

app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROOT TEST
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});

// START SERVER
app.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});