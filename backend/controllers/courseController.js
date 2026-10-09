const Course = require("../models/Course");
const User = require("../models/User");

// =======================================================
// Create Course
// =======================================================

exports.createCourse = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            thumbnail,
            price,
            difficulty,
            lessons,
            tags,
            language,
            status
        } = req.body;

        // ===============================
        // Validation
        // ===============================

        if (!title || !description || !category) {

            return res.status(400).json({

                success: false,
                message: "Title, description and category are required."

            });

        }

        // ===============================
        // Prevent Duplicate Course
        // ===============================

        const existingCourse = await Course.findOne({

            title: title.trim()

        });

        if (existingCourse) {

            return res.status(400).json({

                success: false,
                message: "A course with this title already exists."

            });

        }

        // ===============================
        // Prepare Lessons
        // ===============================

        const formattedLessons = Array.isArray(lessons)
            ? lessons.map((lesson, index) => ({

                title: lesson.title,

                description: lesson.description || "",

                videoUrl: lesson.videoUrl || "",

                notesUrl: lesson.notesUrl || "",

                duration: lesson.duration || 0,

                order: index + 1,

                isPreview: lesson.isPreview || false

            }))
            : [];

        // ===============================
        // Create Course
        // ===============================

        const course = await Course.create({

            title: title.trim(),

            description,

            category,

            thumbnail: thumbnail || "",

            price: price || 0,

            difficulty: difficulty || "Beginner",

            status: status || "Draft",

            lessons: formattedLessons,

            teacher: req.user.id,

            tags: tags || [],

            language: language || "English"

        });

        // ===============================
        // Update Teacher Profile
        // ===============================

        await User.findByIdAndUpdate(

            req.user.id,

            {

                $addToSet: {

                    createdCourses: course._id

                }

            }

        );

        // ===============================
        // Fetch Complete Course
        // ===============================

        const populatedCourse = await Course.findById(course._id)

            .populate("teacher", "name email avatar")

            .populate("students.student", "name email avatar");

        res.status(201).json({

            success: true,

            message: "Course created successfully.",

            course: populatedCourse

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// =======================================================
// Get All Courses
// =======================================================

exports.getCourses = async (req, res) => {

    try {

        let filter = {};

        // ============================================
        // Role Based Filtering
        // ============================================

        if (req.user) {

            if (req.user.role === "teacher") {

                filter.teacher = req.user.id;

            }

            else if (req.user.role === "student") {

                filter.status = "Published";

            }

        }

        else {

            // Public Users
            filter.status = "Published";

        }

        const courses = await Course.find(filter)

            .populate("teacher", "name email avatar")

            .populate("students.student", "name email avatar")

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            totalCourses: courses.length,

            courses

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// =======================================================
// Get Single Course
// =======================================================

exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)

            .populate("teacher", "name email avatar")

            .populate("students.student", "name email avatar");

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found."

            });

        }

        // ============================================
        // Restrict Draft/Archived Courses
        // ============================================

        if (

            course.status !== "Published" &&

            (!req.user ||

                (

                    req.user.role !== "admin" &&

                    course.teacher._id.toString() !== req.user.id

                )

            )

        ) {

            return res.status(403).json({

                success: false,

                message: "This course is not available."

            });

        }

        // ============================================
        // Check Enrollment
        // ============================================

        let isEnrolled = false;

        if (req.user && req.user.role === "student") {

            isEnrolled = course.students.some(

                enrollment =>

                    enrollment.student.toString() === req.user.id

            );

        }

        res.status(200).json({

            success: true,

            isEnrolled,

            course

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// =======================================================
// Update Course
// =======================================================

exports.updateCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        // ============================================
        // Authorization
        // ============================================

        if (

            course.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "You are not authorized to update this course."

            });

        }

        const {
            title,
            description,
            category,
            thumbnail,
            price,
            difficulty,
            lessons,
            status,
            tags,
            language
        } = req.body;

        // ============================================
        // Prevent Duplicate Title
        // ============================================

        if (title && title !== course.title) {

            const exists = await Course.findOne({

                title: title.trim(),
                _id: { $ne: course._id }

            });

            if (exists) {

                return res.status(400).json({

                    success: false,
                    message: "A course with this title already exists."

                });

            }

        }

        // ============================================
        // Update Basic Fields
        // ============================================

        if (title !== undefined)
            course.title = title.trim();

        if (description !== undefined)
            course.description = description;

        if (category !== undefined)
            course.category = category;

        if (thumbnail !== undefined)
            course.thumbnail = thumbnail;

        if (price !== undefined)
            course.price = price;

        if (difficulty !== undefined)
            course.difficulty = difficulty;

        if (status !== undefined)
            course.status = status;

        if (tags !== undefined)
            course.tags = tags;

        if (language !== undefined)
            course.language = language;

        // ============================================
        // Update Lessons
        // ============================================

        if (Array.isArray(lessons)) {

            course.lessons = lessons.map((lesson, index) => ({

                title: lesson.title,

                description: lesson.description || "",

                videoUrl: lesson.videoUrl || "",

                notesUrl: lesson.notesUrl || "",

                duration: lesson.duration || 0,

                order: index + 1,

                isPreview: lesson.isPreview || false

            }));

        }

        await course.save();

        const updatedCourse = await Course.findById(course._id)

            .populate("teacher", "name email avatar")

            .populate("students.student", "name email avatar");

        res.status(200).json({

            success: true,

            message: "Course updated successfully.",

            course: updatedCourse

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// =======================================================
// Delete Course
// =======================================================

exports.deleteCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        // ============================================
        // Authorization
        // ============================================

        if (

            course.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "You are not authorized to delete this course."

            });

        }

        // ============================================
        // Remove Course From Teacher
        // ============================================

        await User.findByIdAndUpdate(

            course.teacher,

            {

                $pull: {

                    createdCourses: course._id

                }

            }

        );

        // ============================================
        // Remove Course From Students
        // ============================================

        const studentIds = course.students.map(

            enrollment => enrollment.student

        );

        if (studentIds.length > 0) {

            await User.updateMany(

                {

                    _id: {

                        $in: studentIds

                    }

                },

                {

                    $pull: {

                        enrolledCourses: course._id

                    }

                }

            );

        }

        await Course.findByIdAndDelete(course._id);

        res.status(200).json({

            success: true,

            message: "Course deleted successfully."

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
// =======================================================
// Enroll Student
// =======================================================

exports.enrollStudent = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        // ============================================
        // Only Published Courses Can Be Enrolled
        // ============================================

        if (course.status !== "Published") {

            return res.status(400).json({

                success: false,
                message: "This course is not open for enrollment."

            });

        }

        // ============================================
        // Already Enrolled?
        // ============================================

        const alreadyEnrolled = course.students.some(

            enrollment =>

                enrollment.student.toString() === req.user.id

        );

        if (alreadyEnrolled) {

            return res.status(400).json({

                success: false,
                message: "You are already enrolled in this course."

            });

        }

        // ============================================
        // Add Student
        // ============================================

        course.students.push({

            student: req.user.id,

            enrolledAt: new Date(),

            progress: 0,

            completed: false

        });

        await course.save();

        // ============================================
        // Update Student Profile
        // ============================================

        await User.findByIdAndUpdate(

            req.user.id,

            {

                $addToSet: {

                    enrolledCourses: course._id

                }

            }

        );

        const updatedCourse = await Course.findById(course._id)

            .populate("teacher", "name email avatar")

            .populate("students.student", "name email avatar");

        res.status(200).json({

            success: true,

            message: "Enrollment successful.",

            totalStudents: updatedCourse.totalEnrollments,

            course: updatedCourse

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// =======================================================
// Get Teacher Courses
// =======================================================

exports.getTeacherCourses = async (req, res) => {

    try {

        const courses = await Course.find({

            teacher: req.user.id

        })

            .populate("students.student", "name email avatar")

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            totalCourses: courses.length,

            courses

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

// =======================================================
// Get Student Courses
// =======================================================

exports.getStudentCourses = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)

            .populate({

                path: "enrolledCourses",

                populate: {

                    path: "teacher",

                    select: "name email avatar"

                }

            });

        res.status(200).json({

            success: true,

            totalCourses: user.enrolledCourses.length,

            courses: user.enrolledCourses

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};