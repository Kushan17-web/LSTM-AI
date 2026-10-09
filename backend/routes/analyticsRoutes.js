const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    saveAnalytics,
    getAnalytics,
    getStudentAnalytics,
    getMyAnalytics,
    getDashboardSummary,
    updateWeeklyProgress,
    resetAnalytics

} = require("../controllers/analyticsController");

// ======================================
// Save Analytics
// ======================================

router.post(

    "/",

    authMiddleware,

    saveAnalytics

);

// ======================================
// Get All Analytics (Admin)
// ======================================

router.get(

    "/",

    authMiddleware,

    roleMiddleware("admin"),

    getAnalytics

);

// ======================================
// Logged-in Student Analytics
// ======================================

router.get(

    "/me",

    authMiddleware,

    getMyAnalytics

);

// ======================================
// Dashboard Summary
// ======================================

router.get(

    "/dashboard",

    authMiddleware,

    getDashboardSummary

);

// ======================================
// Get Any Student Analytics
// ======================================

router.get(

    "/student/:id",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    getStudentAnalytics

);

// ======================================
// Update Weekly Progress
// ======================================

router.put(

    "/weekly-progress",

    authMiddleware,

    updateWeeklyProgress

);

// ======================================
// Reset Student Analytics
// ======================================

router.delete(

    "/:studentId",

    authMiddleware,

    roleMiddleware("admin"),

    resetAnalytics

);

module.exports = router;