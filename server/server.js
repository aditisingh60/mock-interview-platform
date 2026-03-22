const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Intervue API is running" });
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "intervue" })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port 5000 ✅`);
    });
  })
  .catch((err) => console.error("DB connection failed ❌", err));