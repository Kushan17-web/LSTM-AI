const mongoose = require("mongoose");

// ============================================
// Lesson Schema
// ============================================

const lessonSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    videoUrl: {
        type: String,
        default: "",
    },

    notesUrl: {
        type: String,
        default: "",
    },

    duration: {
        type: Number,
        default: 0, // Minutes
    },

    order: {
        type: Number,
        default: 1,
    },

    isPreview: {
        type: Boolean,
        default: false,
    },

}, { _id: true });

// ============================================
// Student Enrollment Schema
// ============================================

const enrollmentSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    enrolledAt: {
        type: Date,
        default: Date.now,
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    completed: {
        type: Boolean,
        default: false,
    },

    completedAt: {
        type: Date,
    }

}, { _id: false });

// ============================================
// Course Schema
// ============================================

const courseSchema = new mongoose.Schema({

    // ========================================
    // Basic Details
    // ========================================

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        default: "",
    },

    // ========================================
    // Teacher
    // ========================================

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // ========================================
    // Pricing
    // ========================================

    price: {
        type: Number,
        default: 0,
    },

    // ========================================
    // Difficulty
    // ========================================

    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },

    // ========================================
    // Course Status
    // ========================================

    status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Draft",
    },

    // ========================================
    // Lessons
    // ========================================

    lessons: [lessonSchema],

    // ========================================
    // Student Enrollments
    // ========================================

    students: [enrollmentSchema],

    // ========================================
    // Statistics
    // ========================================

    totalEnrollments: {
        type: Number,
        default: 0,
    },

    totalLessons: {
        type: Number,
        default: 0,
    },

    estimatedDuration: {
        type: Number,
        default: 0, // Minutes
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    totalRatings: {
        type: Number,
        default: 0,
    },

    // ========================================
    // SEO
    // ========================================

    tags: [{
        type: String,
    }],

    language: {
        type: String,
        default: "English",
    },

    // ========================================
    // Timestamps
    // ========================================

}, {

    timestamps: true

});
// ============================================
// Auto Update Statistics
// ============================================

courseSchema.pre("save", function () {

    this.totalLessons = this.lessons ? this.lessons.length : 0;

    this.totalEnrollments = this.students ? this.students.length : 0;

    this.estimatedDuration = (this.lessons || []).reduce(
        (total, lesson) => total + (lesson.duration || 0),
        0
    );

});


module.exports = mongoose.model("Course", courseSchema);