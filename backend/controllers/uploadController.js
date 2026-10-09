const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const User = require("../models/User");
const Course = require("../models/Course");

const uploadToCloudinary = (buffer, folder, resourceType = "auto") =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });

exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "smart-lms/profile-images",
            "image"
        );

        await User.findByIdAndUpdate(req.user.id, {
            avatar: result.secure_url,
        });

        res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.uploadCourseThumbnail = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "smart-lms/course-thumbnails",
            "image"
        );

        await Course.findByIdAndUpdate(req.params.courseId, {
            thumbnail: result.secure_url,
        });

        res.status(200).json({
            success: true,
            thumbnail: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.uploadLessonVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No video uploaded" });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "smart-lms/lesson-videos",
            "video"
        );

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }

        lesson.videoUrl = result.secure_url;

        await course.save();

        res.status(200).json({
            success: true,
            videoUrl: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.uploadLessonPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No PDF uploaded" });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "smart-lms/lesson-pdfs",
            "raw"
        );

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }

        lesson.notesUrl = result.secure_url;

        await course.save();

        res.status(200).json({
            success: true,
            pdfUrl: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        await cloudinary.uploader.destroy(req.params.publicId, {
            resource_type: "auto",
        });

        res.status(200).json({
            success: true,
            message: "File deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};