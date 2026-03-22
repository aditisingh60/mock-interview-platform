const Question = require("../models/Question");

const getQuestions = async (req, res) => {
    try {
        const { type, difficulty, topic, company, page = 1, limit = 10 } = req.query;
        const isPro = req.user?.subscription === "pro";

        // Dynamic filter build karo
        const filter = {};
        if (type) filter.type = type;
        if (difficulty) filter.difficulty = difficulty;
        if (topic) filter.topic = topic;

        // Company filter — Pro only
        if (company) {
            if (!isPro) {
                return res.status(403).json({ message: "Upgrade to Pro to filter by company" });
            }
            filter.companies = { $in: [company] };
        }

        // Free users ko Pro questions mat dikhao
        if (!isPro) filter.isPro = false;

        const questions = await Question.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select("-solution");

        const total = await Question.countDocuments(filter);

        res.status(200).json({
            questions,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).select("-solution");
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ question });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { getQuestions, getQuestionById };