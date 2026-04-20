const Interview = require("../models/Interview");
const Question = require("../models/Question");
const User = require("../models/User");
const { evaluateAnswer } = require("../services/claudeService");

// ─── SUBMIT INTERVIEW ────────────────────────────────────
const submitInterview = async (req, res) => {
    try {
        const { questionId, answer, timeTaken } = req.body;
        const userId = req.user._id;

        // 1. Free user limit check — 3 interviews/day
        const user = await User.findById(userId);
        const today = new Date().toDateString();
        const lastDate = user.lastInterviewDate
            ? new Date(user.lastInterviewDate).toDateString()
            : null;

        if (user.subscription === "free") {
            if (lastDate === today && user.interviewsToday >= 3) {
                return res.status(403).json({
                    message: "Daily limit reached. Upgrade to Pro for unlimited interviews.",
                });
            }
            // Reset count if new day
            if (lastDate !== today) {
                user.interviewsToday = 0;
            }
        }

        // 2. Question fetch karo
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // 3. Claude AI se evaluate karo
        const aiResult = await evaluateAnswer(question, answer, question.type);

        // 4. Interview save karo
        const interview = await Interview.create({
            userId,
            questionId,
            answer,
            score: aiResult.score,
            feedback: aiResult.feedback,
            strengths: aiResult.strengths,
            improvements: aiResult.improvements,
            modelAnswer: aiResult.modelAnswer,
            timeTaken: timeTaken || 0,
            type: question.type,
        });

        // 5. User ka interview count update karo
        user.interviewsToday += 1;
        user.lastInterviewDate = new Date();
        await user.save();

        res.status(201).json({
            message: "Interview submitted successfully",
            result: {
                score: aiResult.score,
                feedback: aiResult.feedback,
                strengths: aiResult.strengths,
                improvements: aiResult.improvements,
                modelAnswer: aiResult.modelAnswer,
                timeTaken,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// ─── GET INTERVIEW HISTORY ───────────────────────────────
const getHistory = async (req, res) => {
    try {
        const interviews = await Interview.find({ userId: req.user._id })
            .populate("questionId", "title type difficulty")
            .sort({ createdAt: -1 })
            .limit(20);

        const avgScore =
            interviews.length > 0
                ? (interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length).toFixed(1)
                : 0;

        res.status(200).json({
            interviews,
            totalInterviews: interviews.length,
            avgScore,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { submitInterview, getHistory };