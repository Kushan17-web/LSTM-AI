const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({

    questionId: {

        type: mongoose.Schema.Types.ObjectId,

        required: true

    },

    selectedOption: {

        type: Number,

        required: true

    }

});

const attemptSchema = new mongoose.Schema({

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

        ref: "Course"

    },

    answers: [

        answerSchema

    ],

    score: {

        type: Number,

        default: 0

    },

    totalMarks: {

        type: Number,

        default: 0

    },

    percentage: {

        type: Number,

        default: 0

    },

    timeTaken: {

        type: Number,

        default: 0

    },

    submittedAt: {

        type: Date,

        default: Date.now

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(

    "Attempt",

    attemptSchema

);