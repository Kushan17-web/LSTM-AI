const mongoose = require("mongoose");

const learningAnalyticsSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    // AI Metrics

    learningPower: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        default: "Unknown"
    },

    strengths: [{
        type: String
    }],

    weaknesses: [{
        type: String
    }],

    recommendation: {
        type: String,
        default: ""
    },

    learningCoach: {

        strongestTopic: {
            type: String,
            default: ""
        },

        weakestTopic: {
            type: String,
            default: ""
        },

        recommendedStudyTime: {
            type: Number,
            default: 30
        },

        estimatedNextScore: {
            type: Number,
            default: 0
        }

    },

    // Performance

    averageScore: {
        type: Number,
        default: 0
    },

    averageTime: {
        type: Number,
        default: 0
    },

    quizzesCompleted: {
        type: Number,
        default: 0
    },

    completedLessons: {
        type: Number,
        default: 0
    },

    completedCourses: {
        type: Number,
        default: 0
    },

    // Weekly Progress

    weeklyProgress: [

        {
            day: String,
            score: Number
        }

    ],

    // Gamification

    xp: {
        type: Number,
        default: 0
    },

    xpEarned: {
        type: Number,
        default: 0
    },

    level: {
        type: Number,
        default: 1
    },

    streak: {
        type: Number,
        default: 0
    },

    rank: {
        type: Number,
        default: 0
    },

    badges: [{
        type: String
    }],

    lastQuizScore: {
        type: Number,
        default: 0
    },

    // AI Prediction History

    predictions: [

        {
            category: String,
            score: Number,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }

    ],

    lastUpdated: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "LearningAnalytics",
    learningAnalyticsSchema
);