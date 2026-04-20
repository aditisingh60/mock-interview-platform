const User = require("../models/User");

const requirePro = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.subscription !== "pro") {
      return res.status(403).json({
        message: "This feature requires a Pro subscription",
        upgradeUrl: "/pricing",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const checkDailyLimit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.subscription === "pro") return next();
    const today = new Date().toDateString();
    const lastDate = user.lastInterviewDate
      ? new Date(user.lastInterviewDate).toDateString()
      : null;
    if (lastDate !== today) {
      user.interviewsToday = 0;
      await user.save();
    }
    if (user.interviewsToday >= 3) {
      return res.status(403).json({
        message: "Daily limit reached. Upgrade to Pro for unlimited interviews.",
        upgradeUrl: "/pricing",
        interviewsToday: user.interviewsToday,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { requirePro, checkDailyLimit };
