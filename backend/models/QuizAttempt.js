const mongoose = require("mongoose");

// ============================================
// Answer Schema
// ============================================

const answerSchema = new mongoose.Schema({

    question: {

        type: mongoose.Schema.Types.ObjectId,

        required: true

    },

    selectedAnswer: {

        type: mongoose.Schema.Types.Mixed,

        default: null

    },

    isCorrect: {

        type: Boolean,

        default: false

    },

    marksAwarded: {

        type: Number,

        default: 0

    }

}, {

    _id: false

});

// ============================================
// Quiz Attempt Schema
// ============================================

const quizAttemptSchema = new mongoose.Schema({

    student: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    quiz: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Quiz",

        required: true

    },

    course: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Course",

        required: true

    },

    answers: [answerSchema],

    score: {

        type: Number,

        default: 0

    },

    percentage: {

        type: Number,

        default: 0

    },

    passed: {

        type: Boolean,

        default: false

    },

    xpEarned: {

        type: Number,

        default: 0

    },

    durationTaken: {

        type: Number,

        default: 0

    },

    startedAt: {

        type: Date,

        default: Date.now

    },

    submittedAt: {

        type: Date

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(

    "QuizAttempt",

    quizAttemptSchema

);