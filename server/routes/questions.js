const express = require("express");
const router = express.Router();
const { getQuestions, getQuestionById } = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

// Questions fetch karo — login zaroori hai
router.get("/", authMiddleware, getQuestions);

// Single question by ID
router.get("/:id", authMiddleware, getQuestionById);

module.exports = router;