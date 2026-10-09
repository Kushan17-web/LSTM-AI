const Course = require("../models/Course");

// ======================================================
// Get All Lessons
// ======================================================

exports.getLessons = async (req, res) => {

    try {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found."
            });

        }

        res.status(200).json({

            success: true,
            totalLessons: course.lessons.length,
            lessons: course.lessons.sort((a, b) => a.order - b.order)

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Get Single Lesson
// ======================================================

exports.getLesson = async (req, res) => {

    try {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found."
            });

        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {

            return res.status(404).json({
                success: false,
                message: "Lesson not found."
            });

        }

        res.status(200).json({

            success: true,
            lesson

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================================================
// Add Lesson
// ======================================================

exports.addLesson = async (req, res) => {

    try {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found."
            });

        }

        // Teacher/Admin Authorization

        if (

            course.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized."

            });

        }

        const {

            title,
            description,
            videoUrl,
            notesUrl,
            duration,
            isPreview

        } = req.body;

        if (!title) {

            return res.status(400).json({

                success: false,
                message: "Lesson title is required."

            });

        }

        course.lessons.push({

            title,

            description: description || "",

            videoUrl: videoUrl || "",

            notesUrl: notesUrl || "",

            duration: duration || 0,

            order: course.lessons.length + 1,

            isPreview: isPreview || false

        });

        await course.save();

        res.status(201).json({

            success: true,

            message: "Lesson added successfully.",

            totalLessons: course.totalLessons,

            estimatedDuration: course.estimatedDuration,

            lessons: course.lessons

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Update Lesson
// ======================================================

exports.updateLesson = async (req, res) => {

    try {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        if (

            course.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized."

            });

        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {

            return res.status(404).json({

                success: false,
                message: "Lesson not found."

            });

        }

        if (req.body.title !== undefined)
            lesson.title = req.body.title;

        if (req.body.description !== undefined)
            lesson.description = req.body.description;

        if (req.body.videoUrl !== undefined)
            lesson.videoUrl = req.body.videoUrl;

        if (req.body.notesUrl !== undefined)
            lesson.notesUrl = req.body.notesUrl;

        if (req.body.duration !== undefined)
            lesson.duration = req.body.duration;

        if (req.body.isPreview !== undefined)
            lesson.isPreview = req.body.isPreview;

        if (req.body.order !== undefined)
            lesson.order = req.body.order;

        await course.save();

        res.status(200).json({

            success: true,

            message: "Lesson updated successfully.",

            lesson,

            estimatedDuration: course.estimatedDuration

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// ======================================================
// Delete Lesson
// ======================================================

exports.deleteLesson = async (req, res) => {

    try {

        const course = await Course.findById(req.params.courseId);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        if (

            course.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized."

            });

        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {

            return res.status(404).json({

                success: false,
                message: "Lesson not found."

            });

        }

        lesson.deleteOne();

        // Reorder lessons

        course.lessons.forEach((lesson, index) => {

            lesson.order = index + 1;

        });

        await course.save();

        res.status(200).json({

            success: true,

            message: "Lesson deleted successfully.",

            totalLessons: course.totalLessons,

            estimatedDuration: course.estimatedDuration

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};