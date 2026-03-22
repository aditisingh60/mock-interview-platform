const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["dsa", "behavioral", "system_design"],
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        companies: {
            type: [String],
            default: [],
        },
        isPro: {
            type: Boolean,
            default: false,
        },
        starterCode: {
            type: String,
            default: "",
        },
        solution: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);