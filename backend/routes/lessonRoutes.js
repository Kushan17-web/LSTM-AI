const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    getLessons,
    getLesson,
    addLesson,
    updateLesson,
    deleteLesson

} = require("../controllers/lessonController");

// ======================================================
// Get All Lessons
// ======================================================

router.get(

    "/:courseId",

    authMiddleware,

    getLessons

);

// ======================================================
// Get Single Lesson
// ======================================================

router.get(

    "/:courseId/:lessonId",

    authMiddleware,

    getLesson

);

// ======================================================
// Add Lesson
// ======================================================

router.post(

    "/:courseId",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    addLesson

);

// ======================================================
// Update Lesson
// ======================================================

router.put(

    "/:courseId/:lessonId",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    updateLesson

);

// ======================================================
// Delete Lesson
// ======================================================

router.delete(

    "/:courseId/:lessonId",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    deleteLesson

);

module.exports = router;