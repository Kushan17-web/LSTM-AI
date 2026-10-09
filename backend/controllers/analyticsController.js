const Analytics = require("../models/LearningAnalytics");
const User = require("../models/User");

// ======================================================
// Save Analytics
// ======================================================

exports.saveAnalytics = async (req, res) => {

    try {

        const {
            student,
            learningPower,
            category,
            strengths,
            weaknesses,
            recommendation,
            learningCoach,
            averageScore,
            averageTime,
            quizzesCompleted,
            completedLessons,
            completedCourses,
            weeklyProgress,
            xp,
            xpEarned,
            level,
            streak,
            rank,
            badges,
            lastQuizScore,
            predictions
        } = req.body;

        let analytics = await Analytics.findOne({
            student
        });

        if (analytics) {

            analytics = await Analytics.findOneAndUpdate(

                {
                    student
                },

                {
                    learningPower,
                    category,
                    strengths,
                    weaknesses,
                    recommendation,
                    learningCoach,
                    averageScore,
                    averageTime,
                    quizzesCompleted,
                    completedLessons,
                    completedCourses,
                    weeklyProgress,
                    xp,
                    xpEarned,
                    level,
                    streak,
                    rank,
                    badges,
                    lastQuizScore,
                    predictions,
                    lastUpdated: new Date()
                },

                {
                    new: true
                }

            );

        }

        else {

            analytics = await Analytics.create({

                student,
                learningPower,
                category,
                strengths,
                weaknesses,
                recommendation,
                learningCoach,
                averageScore,
                averageTime,
                quizzesCompleted,
                completedLessons,
                completedCourses,
                weeklyProgress,
                xp,
                xpEarned,
                level,
                streak,
                rank,
                badges,
                lastQuizScore,
                predictions

            });

        }

        res.status(200).json({

            success: true,
            message: "Analytics saved successfully.",
            analytics

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Get All Analytics
// ======================================================

exports.getAnalytics = async (req, res) => {

    try {

        const analytics = await Analytics.find()

            .populate("student", "name email role")

            .sort({

                learningPower: -1,
                xp: -1

            });

        res.status(200).json({

            success: true,
            totalStudents: analytics.length,
            analytics

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Get My Analytics
// ======================================================

exports.getMyAnalytics = async (req, res) => {

    try {

        const analytics = await Analytics.findOne({

            student: req.user.id

        }).populate(

            "student",

            "name email profilePicture"

        );

        if (!analytics) {

            return res.status(404).json({

                success: false,
                message: "Analytics not found."

            });

        }

        res.status(200).json({

            success: true,
            analytics

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Get Student Analytics
// ======================================================

exports.getStudentAnalytics = async (req, res) => {

    try {

        const analytics = await Analytics.findOne({

            student: req.params.id

        }).populate(

            "student",

            "name email profilePicture"

        );

        if (!analytics) {

            return res.status(404).json({

                success: false,
                message: "Analytics not found."

            });

        }

        res.status(200).json({

            success: true,
            analytics

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Dashboard Summary
// ======================================================

exports.getDashboardSummary = async (req, res) => {

    try {

        const analytics = await Analytics.findOne({

            student: req.user.id

        }).populate(

            "student",

            "name email profilePicture"

        );

        if (!analytics) {

            return res.status(404).json({

                success: false,
                message: "Analytics not found."

            });

        }

        res.status(200).json({

            success: true,

            dashboard: {

                student: analytics.student,
                learningPower: analytics.learningPower,
                category: analytics.category,
                averageScore: analytics.averageScore,
                averageTime: analytics.averageTime,
                quizzesCompleted: analytics.quizzesCompleted,
                completedLessons: analytics.completedLessons,
                completedCourses: analytics.completedCourses,
                xp: analytics.xp,
                xpEarned: analytics.xpEarned,
                level: analytics.level,
                streak: analytics.streak,
                rank: analytics.rank,
                badges: analytics.badges,
                lastQuizScore: analytics.lastQuizScore,
                recommendation: analytics.recommendation,
                learningCoach: analytics.learningCoach,
                weeklyProgress: analytics.weeklyProgress,
                lastUpdated: analytics.lastUpdated

            }

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Update Weekly Progress
// ======================================================

exports.updateWeeklyProgress = async (req, res) => {

    try {

        const { day, score } = req.body;

        if (!day || score === undefined) {

            return res.status(400).json({

                success: false,
                message: "Day and score are required."

            });

        }

        const analytics = await Analytics.findOne({

            student: req.user.id

        });

        if (!analytics) {

            return res.status(404).json({

                success: false,
                message: "Analytics not found."

            });

        }

        const existing = analytics.weeklyProgress.find(

            item => item.day === day

        );

        if (existing) {

            existing.score = score;

        }

        else {

            analytics.weeklyProgress.push({

                day,
                score

            });

        }

        analytics.lastUpdated = new Date();

        await analytics.save();

        res.status(200).json({

            success: true,
            message: "Weekly progress updated successfully.",
            weeklyProgress: analytics.weeklyProgress

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Reset Analytics
// ======================================================

exports.resetAnalytics = async (req, res) => {

    try {

        const analytics = await Analytics.findOne({

            student: req.params.studentId

        });

        if (!analytics) {

            return res.status(404).json({

                success: false,
                message: "Analytics not found."

            });

        }

        analytics.learningPower = 0;
        analytics.category = "Unknown";
        analytics.strengths = [];
        analytics.weaknesses = [];
        analytics.recommendation = "";
        analytics.learningCoach = {
            strongestTopic: "",
            weakestTopic: "",
            recommendedStudyTime: 30,
            estimatedNextScore: 0
        };
        analytics.averageScore = 0;
        analytics.averageTime = 0;
        analytics.quizzesCompleted = 0;
        analytics.completedLessons = 0;
        analytics.completedCourses = 0;
        analytics.weeklyProgress = [];
        analytics.xp = 0;
        analytics.xpEarned = 0;
        analytics.level = 1;
        analytics.streak = 0;
        analytics.rank = 0;
        analytics.badges = [];
        analytics.lastQuizScore = 0;
        analytics.predictions = [];
        analytics.lastUpdated = new Date();

        await analytics.save();

        res.status(200).json({

            success: true,
            message: "Student analytics reset successfully.",
            analytics

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};