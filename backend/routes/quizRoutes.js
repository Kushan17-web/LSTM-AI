const express = require("express");

const router = express.Router();

const {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    startQuiz,
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Teacher/Admin

router.post(
    "/",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    createQuiz
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    updateQuiz
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    deleteQuiz
);
router.get(
    "/:id/start",
    authMiddleware,
    roleMiddleware("student"),
    startQuiz
);
// Public

router.get("/", getQuizzes);

router.get("/:id", getQuiz);

module.exports = router;