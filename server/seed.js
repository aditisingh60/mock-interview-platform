const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
    {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        type: "dsa",
        difficulty: "easy",
        topic: "arrays",
        companies: ["google", "amazon", "microsoft"],
        isPro: false,
        starterCode: "function twoSum(nums, target) {\n  // your code here\n}",
        solution: "Use a hashmap to store complement of each number.",
        tags: ["hashmap", "arrays"],
    },
    {
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        type: "dsa",
        difficulty: "easy",
        topic: "strings",
        companies: ["amazon", "facebook"],
        isPro: false,
        starterCode: "function isValid(s) {\n  // your code here\n}",
        solution: "Use a stack to match opening and closing brackets.",
        tags: ["stack", "strings"],
    },
    {
        title: "Reverse Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        type: "dsa",
        difficulty: "easy",
        topic: "linked-lists",
        companies: ["microsoft", "apple"],
        isPro: false,
        starterCode: "function reverseList(head) {\n  // your code here\n}",
        solution: "Use three pointers: prev, curr, next.",
        tags: ["linked-list", "pointers"],
    },
    {
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        type: "dsa",
        difficulty: "medium",
        topic: "arrays",
        companies: ["google", "amazon"],
        isPro: false,
        starterCode: "function maxSubArray(nums) {\n  // your code here\n}",
        solution: "Kadane's algorithm — track current and global max.",
        tags: ["dynamic-programming", "arrays"],
    },
    {
        title: "Binary Search",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
        type: "dsa",
        difficulty: "easy",
        topic: "searching",
        companies: ["facebook", "google"],
        isPro: false,
        starterCode: "function search(nums, target) {\n  // your code here\n}",
        solution: "Classic binary search with left and right pointers.",
        tags: ["binary-search"],
    },
    {
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return it as a sorted list.",
        type: "dsa",
        difficulty: "easy",
        topic: "linked-lists",
        companies: ["amazon", "microsoft"],
        isPro: true,
        starterCode: "function mergeTwoLists(l1, l2) {\n  // your code here\n}",
        solution: "Use recursion or iterative approach with dummy node.",
        tags: ["linked-list", "recursion"],
    },
    {
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        type: "dsa",
        difficulty: "easy",
        topic: "dynamic-programming",
        companies: ["google", "amazon"],
        isPro: false,
        starterCode: "function climbStairs(n) {\n  // your code here\n}",
        solution: "Fibonacci sequence — dp[i] = dp[i-1] + dp[i-2].",
        tags: ["dynamic-programming", "fibonacci"],
    },
    {
        title: "Tell me about yourself",
        description: "Give a brief introduction about your background, skills, and why you are interested in this role.",
        type: "behavioral",
        difficulty: "easy",
        topic: "introduction",
        companies: ["google", "amazon", "microsoft", "facebook"],
        isPro: false,
        starterCode: "",
        solution: "Structure: Present role, past experience, future goals. Keep it under 2 minutes.",
        tags: ["introduction", "communication"],
    },
    {
        title: "Tell me about a time you failed",
        description: "Describe a situation where you failed and what you learned from it.",
        type: "behavioral",
        difficulty: "medium",
        topic: "failure",
        companies: ["amazon", "google"],
        isPro: false,
        starterCode: "",
        solution: "Use STAR method: Situation, Task, Action, Result. Focus on learning.",
        tags: ["star-method", "growth"],
    },
    {
        title: "Why do you want to work here?",
        description: "Explain your motivation for applying to this specific company.",
        type: "behavioral",
        difficulty: "easy",
        topic: "motivation",
        companies: ["google", "microsoft", "amazon"],
        isPro: false,
        starterCode: "",
        solution: "Research company values, products, culture. Connect to personal goals.",
        tags: ["motivation", "research"],
    },
    {
        title: "Describe a challenging project",
        description: "Tell me about the most challenging project you have worked on and how you handled it.",
        type: "behavioral",
        difficulty: "medium",
        topic: "projects",
        companies: ["facebook", "amazon", "google"],
        isPro: true,
        starterCode: "",
        solution: "Use STAR method. Highlight technical and soft skills.",
        tags: ["star-method", "projects"],
    },
    {
        title: "Design a URL Shortener",
        description: "Design a system like bit.ly that shortens URLs. Consider scale, storage, and retrieval.",
        type: "system_design",
        difficulty: "medium",
        topic: "system-design",
        companies: ["google", "amazon", "microsoft"],
        isPro: true,
        starterCode: "",
        solution: "Consider: hash function, DB choice, caching, load balancing.",
        tags: ["system-design", "hashing", "caching"],
    },
    {
        title: "Design Twitter",
        description: "Design a simplified version of Twitter with features like tweet, follow, and news feed.",
        type: "system_design",
        difficulty: "hard",
        topic: "system-design",
        companies: ["twitter", "facebook", "google"],
        isPro: true,
        starterCode: "",
        solution: "Consider: fan-out on write vs read, caching, sharding.",
        tags: ["system-design", "scalability"],
    },
    {
        title: "Longest Common Subsequence",
        description: "Given two strings text1 and text2, return the length of their longest common subsequence.",
        type: "dsa",
        difficulty: "medium",
        topic: "dynamic-programming",
        companies: ["google", "amazon"],
        isPro: false,
        starterCode: "function longestCommonSubsequence(text1, text2) {\n  // your code here\n}",
        solution: "2D DP table — dp[i][j] = LCS of text1[0..i] and text2[0..j].",
        tags: ["dynamic-programming", "strings"],
    },
    {
        title: "Number of Islands",
        description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        type: "dsa",
        difficulty: "medium",
        topic: "graphs",
        companies: ["amazon", "facebook", "google"],
        isPro: false,
        starterCode: "function numIslands(grid) {\n  // your code here\n}",
        solution: "DFS/BFS — mark visited cells, count connected components.",
        tags: ["graphs", "dfs", "bfs"],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "intervue" });
        console.log("MongoDB connected ✅");

        await Question.deleteMany({});
        console.log("Old questions deleted 🗑️");

        await Question.insertMany(questions);
        console.log(`${questions.length} questions seeded ✅`);

        mongoose.connection.close();
        console.log("Done! DB connection closed 🔒");
    } catch (err) {
        console.error("Seed failed ❌", err.message);
        process.exit(1);
    }
};

seedDB();