const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    // =========================
    // Basic Information
    // =========================

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
    },

    // =========================
    // Profile
    // =========================

    avatar: {
        type: String,
        default: "",
    },

    phone: {
        type: String,
        default: "",
    },

    bio: {
        type: String,
        default: "",
    },

    college: {
        type: String,
        default: "",
    },

    department: {
        type: String,
        default: "",
    },

    semester: {
        type: Number,
        default: 1,
    },

    // =========================
    // Student Course Relations
    // =========================

    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],

    // =========================
    // Teacher Course Relations
    // =========================

    createdCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],

    // =========================
    // Gamification
    // =========================

    xp: {
        type: Number,
        default: 0,
    },

    level: {
        type: Number,
        default: 1,
    },

    streak: {
        type: Number,
        default: 0,
    },

    badges: [
        {
            type: String,
        },
    ],

    // =========================
    // Certificates
    // =========================

    certificates: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            certificateUrl: {
                type: String,
                default: "",
            },
            issuedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    // =========================
    // Account Settings
    // =========================

    isVerified: {
        type: Boolean,
        default: false,
    },

    lastLogin: {
        type: Date,
    },

    // =========================
    // Timestamps
    // =========================

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("User", UserSchema);