const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    imageUpload,
    pdfUpload,
    videoUpload,
} = require("../middleware/upload");

const {
    uploadProfileImage,
    uploadCourseThumbnail,
    uploadLessonVideo,
    uploadLessonPDF,
    deleteFile,
} = require("../controllers/uploadController");

// ==========================================
// Profile Image
// ==========================================

router.post(
    "/profile",
    authMiddleware,
    imageUpload.single("image"),
    uploadProfileImage
);

// ==========================================
// Course Thumbnail
// ==========================================

router.post(
    "/course-thumbnail/:courseId",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    imageUpload.single("image"),
    uploadCourseThumbnail
);

// ==========================================
// Lesson Video
// ==========================================

router.post(
    "/lesson-video/:courseId/:lessonId",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    videoUpload.single("video"),
    uploadLessonVideo
);

// ==========================================
// Lesson PDF
// ==========================================

router.post(
    "/lesson-pdf/:courseId/:lessonId",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    pdfUpload.single("pdf"),
    uploadLessonPDF
);

// ==========================================
// Delete File
// ==========================================

router.delete(
    "/:publicId",
    authMiddleware,
    roleMiddleware("teacher", "admin"),
    deleteFile
);

module.exports = router;