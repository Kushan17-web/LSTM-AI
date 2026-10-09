const Quiz = require("../models/Quiz");
const Course = require("../models/Course");
const LearningAnalytics = require("../models/LearningAnalytics");

const {
    generateAdaptiveQuestions,
    getDifficulty
} = require("../services/adaptiveQuizService");

// ======================================================
// Create Quiz
// ======================================================

exports.createQuiz = async (req, res) => {

    try {

        const {

            title,
            description,
            course,
            questions,
            duration,
            passingMarks,
            shuffleQuestions,
            shuffleOptions,
            maxAttempts,
            isPublished

        } = req.body;

        // ============================================
        // Validation
        // ============================================

        if (!title || !course) {

            return res.status(400).json({

                success: false,
                message: "Quiz title and course are required."

            });

        }

        // ============================================
        // Verify Course
        // ============================================

        const existingCourse = await Course.findById(course);

        if (!existingCourse) {

            return res.status(404).json({

                success: false,
                message: "Course not found."

            });

        }

        // ============================================
        // Teacher Ownership
        // ============================================

        if (

            existingCourse.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "You are not allowed to create quizzes for this course."

            });

        }

        // ============================================
        // Duplicate Quiz Check
        // ============================================

        const duplicateQuiz = await Quiz.findOne({

            title: title.trim(),

            course

        });

        if (duplicateQuiz) {

            return res.status(400).json({

                success: false,
                message: "Quiz already exists."

            });

        }
        

        // ============================================
        // Create Quiz
        // ============================================

        const quiz = await Quiz.create({

            title: title.trim(),

            description: description || "",

            teacher: req.user.id,

            course,

            questions: questions || [],

            duration: duration || 30,

            passingMarks: passingMarks || 40,

            shuffleQuestions: shuffleQuestions || false,

            shuffleOptions: shuffleOptions || false,

            maxAttempts: maxAttempts || 1,

            isPublished: isPublished || false

        });

        const populatedQuiz = await Quiz.findById(quiz._id)

            .populate("teacher", "name email avatar")

            .populate("course", "title category");

        res.status(201).json({

            success: true,

            message: "Quiz created successfully.",

            quiz: populatedQuiz

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
// ======================================================
// Get All Quizzes
// ======================================================

exports.getQuizzes = async (req, res) => {

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

                filter.isPublished = true;

            }

        }

        else {

            filter.isPublished = true;

        }

        const quizzes = await Quiz.find(filter)

            .populate("course", "title category")

            .populate("teacher", "name email avatar")

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            totalQuizzes: quizzes.length,

            quizzes

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

// ======================================================
// Get Single Quiz
// ======================================================

exports.getQuiz = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id)

            .populate("course", "title category")

            .populate("teacher", "name email avatar");

        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found."

            });

        }

        // ============================================
        // Teacher/Admin Access
        // ============================================

        if (

            req.user.role === "teacher" &&

            quiz.teacher._id.toString() !== req.user.id

        ) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized."

            });

        }

        // ============================================
        // Students can only view published quizzes
        // ============================================

        if (

            req.user.role === "student" &&

            !quiz.isPublished

        ) {

            return res.status(403).json({

                success: false,

                message: "Quiz is not published."

            });

        }

        // ============================================
        // Hide Answers From Students
        // ============================================

        let responseQuiz = quiz.toObject();

        if (req.user.role === "student") {

            responseQuiz.questions = responseQuiz.questions.map(question => ({

                _id: question._id,

                question: question.question,

                type: question.type,

                options: question.options,

                marks: question.marks,

                negativeMarks: question.negativeMarks

            }));

        }

        res.status(200).json({

            success: true,

            quiz: responseQuiz

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
// ======================================================
// Start Adaptive Quiz
// ======================================================

exports.startQuiz = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id)

            .populate("course", "title category")

            .populate("teacher", "name email");

        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found."

            });

        }

        // ============================================
        // Only Published Quizzes
        // ============================================

        if (

            !quiz.isPublished &&

            req.user.role !== "teacher" &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,

                message: "Quiz is not published."

            });

        }

        // ============================================
        // Student Analytics
        // ============================================

        let analytics = await LearningAnalytics.findOne({

            student: req.user.id

        });

        // ============================================
        // AI Difficulty
        // ============================================

        let difficulty = "Beginner";

        if (analytics) {

            difficulty = getDifficulty(analytics);

        }

        // ============================================
        // Adaptive Questions
        // ============================================

        let questions = [...quiz.questions];

        if (typeof generateAdaptiveQuestions === "function") {

            questions = generateAdaptiveQuestions(

                questions,

                analytics

            );

        }

        // ============================================
        // Shuffle Questions
        // ============================================

        if (quiz.shuffleQuestions) {

            questions.sort(() => Math.random() - 0.5);

        }

        // ============================================
        // Shuffle Options
        // ============================================

        if (quiz.shuffleOptions) {

            questions = questions.map(question => {

                let options = [...question.options];

                options.sort(() => Math.random() - 0.5);

                return {

                    _id: question._id,

                    question: question.question,

                    type: question.type,

                    options,

                    marks: question.marks,

                    negativeMarks: question.negativeMarks

                };

            });

        }

        else {

            questions = questions.map(question => ({

                _id: question._id,

                question: question.question,

                type: question.type,

                options: question.options,

                marks: question.marks,

                negativeMarks: question.negativeMarks

            }));

        }

        // ============================================
        // Response
        // ============================================

        res.status(200).json({

            success: true,

            difficulty,

            questionCount: questions.length,

            quiz: {

                _id: quiz._id,

                title: quiz.title,

                description: quiz.description,

                duration: quiz.duration,

                passingMarks: quiz.passingMarks,

                totalMarks: quiz.totalMarks,

                maxAttempts: quiz.maxAttempts,

                course: quiz.course,

                teacher: quiz.teacher,

                questions

            }

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
// ======================================================
// Update Quiz
// ======================================================

exports.updateQuiz = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({

                success: false,
                message: "Quiz not found."

            });

        }

        // ============================================
        // Teacher Ownership
        // ============================================

        if (

            quiz.teacher.toString() !== req.user.id &&

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
            questions,
            duration,
            passingMarks,
            shuffleQuestions,
            shuffleOptions,
            maxAttempts,
            isPublished

        } = req.body;

        // ============================================
        // Duplicate Quiz Title
        // ============================================

        if (title && title !== quiz.title) {

            const exists = await Quiz.findOne({

                title: title.trim(),

                course: quiz.course,

                _id: { $ne: quiz._id }

            });

            if (exists) {

                return res.status(400).json({

                    success: false,
                    message: "Quiz title already exists."

                });

            }

        }

        // ============================================
        // Update Fields
        // ============================================

        if (title !== undefined)
            quiz.title = title.trim();

        if (description !== undefined)
            quiz.description = description;

        if (questions !== undefined)
            quiz.questions = questions;

        if (duration !== undefined)
            quiz.duration = duration;

        if (passingMarks !== undefined)
            quiz.passingMarks = passingMarks;

        if (shuffleQuestions !== undefined)
            quiz.shuffleQuestions = shuffleQuestions;

        if (shuffleOptions !== undefined)
            quiz.shuffleOptions = shuffleOptions;

        if (maxAttempts !== undefined)
            quiz.maxAttempts = maxAttempts;

        if (isPublished !== undefined)
            quiz.isPublished = isPublished;

        await quiz.save();

        const updatedQuiz = await Quiz.findById(quiz._id)

            .populate("course", "title category")

            .populate("teacher", "name email avatar");

        res.status(200).json({

            success: true,

            message: "Quiz updated successfully.",

            quiz: updatedQuiz

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

// ======================================================
// Delete Quiz
// ======================================================

exports.deleteQuiz = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({

                success: false,
                message: "Quiz not found."

            });

        }

        // ============================================
        // Teacher Ownership
        // ============================================

        if (

            quiz.teacher.toString() !== req.user.id &&

            req.user.role !== "admin"

        ) {

            return res.status(403).json({

                success: false,
                message: "Unauthorized."

            });

        }

        await Quiz.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Quiz deleted successfully."

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
