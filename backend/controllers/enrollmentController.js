const Enrollment = require("../models/Enrollment");

exports.enrollCourse = async (req, res) => {
    try {
        const exists = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId,
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled",
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: req.params.courseId,
        });

        res.status(201).json({
            success: true,
            enrollment,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.id,
        }).populate("course");

        res.json({
            success: true,
            enrollments,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
