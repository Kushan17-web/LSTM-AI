const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    getTeacherDashboard,
    getStudentDashboard
} = require("../controllers/dashboardController");

// ==============================
// Teacher Dashboard
// ==============================

router.get(
    "/teacher",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    getTeacherDashboard
);

// ==============================
// Student Dashboard
// ==============================

router.get(
    "/student",
    authMiddleware,
    roleMiddleware("student"),
    getStudentDashboard
);

module.exports = router;
