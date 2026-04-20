const express = require("express");
const router = express.Router();
const { submitInterview, getHistory } = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");
const { checkDailyLimit } = require("../middleware/planMiddleware");

router.post("/submit", authMiddleware, checkDailyLimit, submitInterview);
router.get("/history", authMiddleware, getHistory);

module.exports = router;
