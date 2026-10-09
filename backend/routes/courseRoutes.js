const express = require("express");
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    enrollStudent,
    getTeacherCourses,
    getStudentCourses
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ========================
// Public Routes
// ========================

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", getCourse);

// ========================
// Teacher/Admin Routes
// ========================
// Teacher Dashboard Courses
router.get(
    "/teacher/my-courses",
    authMiddleware,
    roleMiddleware("teacher"),
    getTeacherCourses
);

// Student Dashboard Courses
router.get(
    "/student/my-courses",
    authMiddleware,
    roleMiddleware("student"),
    getStudentCourses
);
// Create Course
router.post(
    "/",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    createCourse
);

// Update Course
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    updateCourse
);

// Delete Course
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    deleteCourse
);

// ========================
// Student Routes
// ========================

// Enroll in Course
router.post(
    "/enroll/:id",
    authMiddleware,
    roleMiddleware("student"),
    enrollStudent
);

module.exports = router;