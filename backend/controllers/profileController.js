const User = require("../models/User");
const LearningAnalytics = require("../models/LearningAnalytics");
const QuizAttempt = require("../models/QuizAttempt");

exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        const analytics = await LearningAnalytics.findOne({
            student: req.user.id,
        });

        const history = await QuizAttempt.find({
            student: req.user.id,
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("quiz", "title");

        res.json({
            success: true,
            user,
            analytics,
            history,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

exports.updateProfile = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        res.json({
            success: true,
            user,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};