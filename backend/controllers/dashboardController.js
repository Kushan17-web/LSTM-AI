const User = require("../models/User");
const Course = require("../models/Course");
const Quiz = require("../models/Quiz");
const Attempt = require("../models/Attempt");
const LearningAnalytics = require("../models/LearningAnalytics");
const Enrollment = require("../models/Enrollment");
const Notification = require("../models/Notification");

const {
    generateRecommendation,
} = require("../services/recommendationService");

const {
    generateStudyPlan,
} = require("../services/studyPlannerService");

// ======================================
// Teacher Dashboard
// ======================================

exports.getTeacherDashboard = async (req, res) => {

    try {

        const totalStudents = await User.countDocuments({
            role: "student",
        });

        const totalTeachers = await User.countDocuments({
            role: "teacher",
        });

        const totalCourses = await Course.countDocuments();

        const totalQuizzes = await Quiz.countDocuments();

        const analytics = await LearningAnalytics.find();

        const fastLearners = analytics.filter(
            (a) => a.category === "Fast Learner"
        ).length;

        const averageLearners = analytics.filter(
            (a) => a.category === "Average Learner"
        ).length;

        const needsPractice = analytics.filter(
            (a) => a.category === "Needs Practice"
        ).length;

        const atRisk = analytics.filter(
            (a) => a.category === "At Risk"
        ).length;

        const averageLearningPower =
            analytics.length > 0
                ? (
                    analytics.reduce(
                        (sum, a) => sum + (a.learningPower || 0),
                        0
                    ) / analytics.length
                ).toFixed(2)
                : 0;

        const topStudents = analytics
            .sort((a, b) => b.learningPower - a.learningPower)
            .slice(0, 5);

        res.status(200).json({

            success: true,

            statistics: {

                totalStudents,

                totalTeachers,

                totalCourses,

                totalQuizzes,

                averageLearningPower,

            },

            categories: {

                fastLearners,

                averageLearners,

                needsPractice,

                atRisk,

            },

            topStudents,

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};

// ======================================
// Student Dashboard
// ======================================
exports.getStudentDashboard = async (req, res) => {

    try {

        const studentId = req.user.id;

        // ==========================
        // Analytics
        // ==========================

        const analytics = await LearningAnalytics.findOne({

            student: studentId,

        });

        // ==========================
        // Notifications
        // ==========================

        const notifications = await Notification.find({

            user: studentId,

        })
            .sort({ createdAt: -1 })
            .limit(5);

        // ==========================
        // Study Plan
        // ==========================

        const studyPlan = generateStudyPlan(
            analytics || {}
        );

        // ==========================
        // AI Insights
        // ==========================

        const aiInsights = {

            category:
                analytics?.category || "Unknown",

            strengths:
                analytics?.strengths || [],

            weaknesses:
                analytics?.weaknesses || [],

            learningCoach:
                analytics?.learningCoach || {},

        };

        // ==========================
        // Badges
        // ==========================

        const badges =
            analytics?.badges || [];

        // ==========================
        // Recent Quizzes
        // ==========================

        const recentQuizzes = await Attempt.find({

            student: studentId,

        })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("quiz", "title")
            .populate("course", "title");

        // ==========================
        // Enrolled Courses
        // ==========================

        const enrolledCourses = await Enrollment.find({

            student: studentId,

        }).populate(

            "course",

            "title thumbnail"

        );

        const continueLearning = enrolledCourses.map(

            (course) => ({

                _id: course.course?._id,

                title: course.course?.title,

                thumbnail: course.course?.thumbnail,

                progress: course.progress || 0,

            })

        );

        // ==========================
        // Response
        // ==========================

        res.status(200).json({

            success: true,

            statistics: {

                enrolledCourses:
                    enrolledCourses.length,

                completedLessons:
                    analytics?.completedLessons || 0,

                completedQuizzes:
                    analytics?.quizzesCompleted || 0,

                averageScore:
                    analytics?.averageScore || 0,

                xp:
                    analytics?.xp || 0,

                level:
                    analytics?.level || 1,

                streak:
                    analytics?.streak || 0,

            },

            recentQuizzes,

            continueLearning,

            weeklyProgress:
                analytics?.weeklyProgress || [],

            recommendation:
                generateRecommendation(
                    analytics || {}
                ),

            badges,

            notifications,

            studyPlan,

            aiInsights,

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message,

        });

    }

};