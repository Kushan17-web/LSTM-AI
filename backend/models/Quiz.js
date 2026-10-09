const mongoose = require("mongoose");

// ============================================
// Question Schema
// ============================================

const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
        trim: true,
    },

    type: {
        type: String,
        enum: ["mcq", "multiple", "truefalse", "short"],
        default: "mcq",
    },

    options: [{
        type: String
    }],

    correctAnswer: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },

    marks: {
        type: Number,
        default: 1,
    },

    negativeMarks: {
        type: Number,
        default: 0,
    },

    explanation: {
        type: String,
        default: "",
    }

}, { _id: true });

// ============================================
// Quiz Schema
// ============================================

const quizSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    questions: [questionSchema],

    passingMarks: {
        type: Number,
        default: 40,
    },

    totalMarks: {
        type: Number,
        default: 0,
    },

    duration: {
        type: Number,
        default: 30, // minutes
    },

    shuffleQuestions: {
        type: Boolean,
        default: false,
    },

    shuffleOptions: {
        type: Boolean,
        default: false,
    },

    maxAttempts: {
        type: Number,
        default: 1,
    },

    isPublished: {
        type: Boolean,
        default: false,
    }

}, {

    timestamps: true

});

// ============================================
// Auto Calculate Total Marks
// ============================================

quizSchema.pre("save", function () {

    this.totalMarks = (this.questions || []).reduce(
        (sum, question) => sum + (question.marks || 0),
        0
    );

});

module.exports = mongoose.model("Quiz", quizSchema);