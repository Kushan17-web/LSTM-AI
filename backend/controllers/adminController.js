const User = require("../models/User");
const Course = require("../models/Course");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const LearningAnalytics = require("../models/LearningAnalytics");

exports.getDashboard = async (req, res) => {
    try {
        const students = await User.countDocuments({
            role: "student",
        });

        const teachers = await User.countDocuments({
            role: "teacher",
        });

        const admins = await User.countDocuments({
            role: "admin",
        });

        const courses = await Course.countDocuments();

        // Count embedded lessons inside all courses
        const allCourses = await Course.find({}, "lessons");

        const lessons = allCourses.reduce(
            (total, course) => total + (course.lessons?.length || 0),
            0
        );

        const quizzes = await Quiz.countDocuments();

        const attempts = await QuizAttempt.countDocuments();

        const topStudents = await LearningAnalytics.find()
            .populate("student", "name email")
            .sort({ xp: -1 })
            .limit(10);

        res.json({
            success: true,
            statistics: {
                students,
                teachers,
                admins,
                courses,
                lessons,
                quizzes,
                attempts,
            },
            topStudents,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};