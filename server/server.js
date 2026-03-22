const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Intervue API is running" });
});

// Global error handler — Express v5 ke liye zaroori
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res.status(500).json({ message: "Server error", error: err.message });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "intervue" });
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000} ✅`);
    });
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  }
};

startServer();