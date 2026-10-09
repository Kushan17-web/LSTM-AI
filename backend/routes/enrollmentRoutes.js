const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    enrollCourse,
    getMyEnrollments,
} = require("../controllers/enrollmentController");

router.post(
    "/:courseId",
    authMiddleware,
    enrollCourse
);

router.get(
    "/my",
    authMiddleware,
    getMyEnrollments
);

module.exports = router;