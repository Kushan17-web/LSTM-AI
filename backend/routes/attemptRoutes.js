const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    submitQuiz,
    getMyAttempts,
    getAttemptById,
    getQuizLeaderboard,
    getQuizAnalytics,
    deleteAttempt

} = require("../controllers/attemptController");

// ======================================
// Submit Quiz
// ======================================

router.post(

    "/:id",

    authMiddleware,

    roleMiddleware("student"),

    submitQuiz

);

// ======================================
// Get My Attempts
// ======================================

router.get(

    "/my-attempts",

    authMiddleware,

    roleMiddleware("student"),

    getMyAttempts

);

// ======================================
// Get Attempt By ID
// ======================================

router.get(

    "/attempt/:id",

    authMiddleware,

    getAttemptById

);

// ======================================
// Quiz Leaderboard
// ======================================

router.get(

    "/leaderboard/:id",

    authMiddleware,

    getQuizLeaderboard

);

// ======================================
// Quiz Analytics
// ======================================

router.get(

    "/analytics/:id",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    getQuizAnalytics

);

// ======================================
// Delete Attempt
// ======================================

router.delete(

    "/attempt/:id",

    authMiddleware,

    roleMiddleware("teacher", "admin"),

    deleteAttempt

);
console.log({
    submitQuiz,
    getMyAttempts,
    getAttemptById,
    getQuizLeaderboard,
    getQuizAnalytics,
    deleteAttempt,
});

module.exports = router;
