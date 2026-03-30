const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        feedback: {
            type: String,
            default: "",
        },
        strengths: {
            type: [String],
            default: [],
        },
        improvements: {
            type: [String],
            default: [],
        },
        modelAnswer: {
            type: String,
            default: "",
        },
        timeTaken: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
            enum: ["dsa", "behavioral", "system_design"],
            required: true,
        },
        status: {
            type: String,
            enum: ["completed", "skipped"],
            default: "completed",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);