const QuizAttempt = require("../models/QuizAttempt");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const LearningAnalytics = require("../models/LearningAnalytics");

const { predictCategory } = require("../services/pythonService");
const { calculateXP } = require("../services/xpService");
const { calculateLevel } = require("../services/levelService");
const { getBadges } = require("../services/badgeService");
const { getRecommendation } = require("../services/recommendationEngine");
const { generateLearningCoach } = require("../services/learningCoach");

// ======================================================
// Submit Quiz
// ======================================================

exports.submitQuiz = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found."

            });

        }

        // ============================================
        // Published Validation
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

        const {

            answers = [],

            completedIn = 0

        } = req.body;

        // ============================================
        // Maximum Attempts
        // ============================================

        const attempts = await QuizAttempt.countDocuments({

            student: req.user.id,

            quiz: quiz._id

        });

        if (attempts >= quiz.maxAttempts) {

            return res.status(400).json({

                success: false,

                message: "Maximum attempts reached."

            });

        }

        // ============================================
        // Evaluate Answers
        // ============================================

        let score = 0;

        let evaluatedAnswers = [];

        for (const answer of answers) {

            const question = quiz.questions.id(

                answer.questionId

            );

            if (!question)

                continue;

            let isCorrect = false;

            let marksAwarded = 0;

            switch (question.type) {

                // ----------------------------
                // MCQ
                // ----------------------------

                case "mcq":

                    isCorrect =

                        answer.selectedAnswer ===

                        question.correctAnswer;

                    break;

                // ----------------------------
                // Multiple Correct
                // ----------------------------

                case "multiple":

                    if (

                        Array.isArray(answer.selectedAnswer) &&

                        Array.isArray(question.correctAnswer)

                    ) {

                        const userAnswer =

                            [...answer.selectedAnswer]

                                .sort();

                        const correctAnswer =

                            [...question.correctAnswer]

                                .sort();

                        isCorrect =

                            JSON.stringify(userAnswer) ===

                            JSON.stringify(correctAnswer);

                    }

                    break;

                // ----------------------------
                // True / False
                // ----------------------------

                case "truefalse":

                    isCorrect =

                        answer.selectedAnswer ===

                        question.correctAnswer;

                    break;

                // ----------------------------
                // Short Answer
                // ----------------------------

                case "short":

                    isCorrect =

                        String(answer.selectedAnswer)

                            .trim()

                            .toLowerCase()

                        ===

                        String(question.correctAnswer)

                            .trim()

                            .toLowerCase();

                    break;

            }

            if (isCorrect) {

                marksAwarded = question.marks;

                score += question.marks;

            }

            else {

                marksAwarded =

                    -question.negativeMarks;

                score -= question.negativeMarks;

            }

            evaluatedAnswers.push({

                question: question._id,

                selectedAnswer:

                    answer.selectedAnswer,

                isCorrect,

                marksAwarded

            });

        }

        // ============================================
        // Total Marks
        // ============================================

        const totalMarks =

            quiz.questions.reduce(

                (sum, question) =>

                    sum + question.marks,

                0

            );

        const percentage =

            totalMarks > 0

                ? Number(

                    (

                        (score / totalMarks) * 100

                    ).toFixed(2)

                )

                : 0;

        const passed =

            percentage >= quiz.passingMarks;

        // ============================================
        // XP
        // ============================================

        let earnedXP =

            calculateXP(percentage);

        if (passed)

            earnedXP += 25;

        if (percentage === 100)

            earnedXP += 50;
                    // ============================================
        // Save Attempt
        // ============================================

        const attempt = await QuizAttempt.create({

            student: req.user.id,

            quiz: quiz._id,

            course: quiz.course,

            answers: evaluatedAnswers,

            score,

            percentage,

            passed,

            xpEarned: earnedXP,

            durationTaken: completedIn,

            startedAt: new Date(Date.now() - (completedIn * 1000)),

            submittedAt: new Date()

        });

        // ============================================
        // AI Prediction
        // ============================================

        let prediction = "Average Learner";

        try {

            prediction = await predictCategory({

                quiz_score: percentage,

                assignment_score: percentage,

                attendance: 90,

                study_time: 4,

                completion_rate: 95,

                average_quiz_time: completedIn,

                consistency: 90,

                improvement: percentage

            });

        }

        catch (err) {

            console.error(

                "AI Prediction Failed:",

                err.message

            );

        }

        // ============================================
        // Previous Analytics
        // ============================================

        const previous =

            await LearningAnalytics.findOne({

                student: req.user.id

            });

        const quizzesCompleted =

            previous

                ? (previous.quizzesCompleted || 0) + 1

                : 1;

        const averageScore =

            previous

                ?

                (

                    (

                        (previous.averageScore || 0)

                        *

                        (previous.quizzesCompleted || 0)

                    )

                    +

                    percentage

                )

                /

                quizzesCompleted

                :

                percentage;

        // ============================================
        // XP / Level / Badges
        // ============================================

        const xp =

            (previous?.xp || 0)

            +

            earnedXP;

        const level =

            calculateLevel(xp);

        const badges =

            getBadges(

                previous?.badges || [],

                percentage,

                quizzesCompleted,

                level

            );

        // ============================================
        // Recommendation
        // ============================================

        const recommendation =

            getRecommendation(

                prediction

            );

        // ============================================
        // Learning Coach
        // ============================================

        const learningCoach =

            generateLearningCoach(

                quiz,

                evaluatedAnswers,

                previous,

                percentage

            );

        // ============================================
        // Save Analytics
        // ============================================

        const analytics =

            await LearningAnalytics.findOneAndUpdate(

                {

                    student: req.user.id

                },

                {

                    student: req.user.id,

                    learningPower: percentage,

                    category: prediction,

                    averageScore,

                    averageTime: completedIn,

                    quizzesCompleted,

                    xp,

                    level,

                    badges,

                    recommendation,

                    learningCoach,

                    xpEarned: earnedXP,

                    lastQuizScore: percentage,

                    passed,

                    lastUpdated: new Date()

                },

                {

                    upsert: true,

                    new: true

                }

            );

        // ============================================
        // Update User
        // ============================================

        await User.findByIdAndUpdate(

            req.user.id,

            {

                xp,

                level,

                badges

            }

        );

        // ============================================
        // Response
        // ============================================

        res.status(201).json({

            success: true,

            message: "Quiz submitted successfully.",

            score,

            totalMarks,

            percentage,

            passed,

            aiCategory: prediction,

            xpEarned: earnedXP,

            totalXP: xp,

            level,

            badges,

            recommendation,

            learningCoach,

            analytics,

            attempt

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
// Get My Attempts
// ======================================================

exports.getMyAttempts = async (req, res) => {

    try {

        const attempts = await QuizAttempt.find({

            student: req.user.id

        })

        .populate({

            path: "quiz",

            select: "title passingMarks maxAttempts"

        })

        .populate({

            path: "course",

            select: "title thumbnail"

        })

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            totalAttempts: attempts.length,

            attempts

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
// Get Attempt By ID
// ======================================================

exports.getAttemptById = async (req, res) => {

    try {

        const attempt = await QuizAttempt.findById(req.params.id)

            .populate({

                path: "student",

                select: "name email profilePicture"

            })

            .populate({

                path: "course",

                select: "title thumbnail"

            })

            .populate({

                path: "quiz"

            });

        if (!attempt) {

            return res.status(404).json({

                success: false,

                message: "Quiz attempt not found."

            });

        }

        if (

            req.user.role === "student" &&

            attempt.student._id.toString() !== req.user.id

        ) {

            return res.status(403).json({

                success: false,

                message: "You are not authorized to view this attempt."

            });

        }

        res.status(200).json({

            success: true,

            attempt

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
// Get Quiz Leaderboard
// ======================================================

exports.getQuizLeaderboard = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found."

            });

        }

        const leaderboard = await QuizAttempt.find({

            quiz: req.params.id

        })

        .populate({

            path: "student",

            select: "name email profilePicture"

        })

        .sort({

            percentage: -1,

            score: -1,

            durationTaken: 1,

            submittedAt: 1

        })

        .limit(20);

        const rankedLeaderboard = leaderboard.map((attempt, index) => ({

            rank: index + 1,

            student: attempt.student,

            score: attempt.score,

            percentage: attempt.percentage,

            passed: attempt.passed,

            xpEarned: attempt.xpEarned,

            durationTaken: attempt.durationTaken,

            submittedAt: attempt.submittedAt

        }));

        res.status(200).json({

            success: true,

            quiz: {

                id: quiz._id,

                title: quiz.title

            },

            totalParticipants: leaderboard.length,

            leaderboard: rankedLeaderboard

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
// Get Quiz Analytics
// ======================================================

exports.getQuizAnalytics = async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({

                success: false,

                message: "Quiz not found."

            });

        }

        const attempts = await QuizAttempt.find({

            quiz: req.params.id

        });

        if (attempts.length === 0) {

            return res.status(200).json({

                success: true,

                analytics: {

                    totalAttempts: 0,

                    passed: 0,

                    failed: 0,

                    passRate: 0,

                    averageScore: 0,

                    averagePercentage: 0,

                    averageTime: 0,

                    highestScore: 0,

                    lowestScore: 0

                }

            });

        }

        const totalAttempts = attempts.length;

        const passed = attempts.filter(

            attempt => attempt.passed

        ).length;

        const failed = totalAttempts - passed;

        const totalScore = attempts.reduce(

            (sum, attempt) => sum + attempt.score,

            0

        );

        const totalPercentage = attempts.reduce(

            (sum, attempt) => sum + attempt.percentage,

            0

        );

        const totalTime = attempts.reduce(

            (sum, attempt) => sum + attempt.durationTaken,

            0

        );

        const highestScore = Math.max(

            ...attempts.map(

                attempt => attempt.score

            )

        );

        const lowestScore = Math.min(

            ...attempts.map(

                attempt => attempt.score

            )

        );

        const analytics = {

            totalAttempts,

            passed,

            failed,

            passRate: Number(

                (

                    (passed / totalAttempts) * 100

                ).toFixed(2)

            ),

            averageScore: Number(

                (

                    totalScore / totalAttempts

                ).toFixed(2)

            ),

            averagePercentage: Number(

                (

                    totalPercentage / totalAttempts

                ).toFixed(2)

            ),

            averageTime: Number(

                (

                    totalTime / totalAttempts

                ).toFixed(2)

            ),

            highestScore,

            lowestScore

        };

        res.status(200).json({

            success: true,

            quiz: {

                id: quiz._id,

                title: quiz.title

            },

            analytics

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
// Delete Attempt
// ======================================================

exports.deleteAttempt = async (req, res) => {

    try {

        const attempt = await QuizAttempt.findById(req.params.id);

        if (!attempt) {

            return res.status(404).json({

                success: false,

                message: "Quiz attempt not found."

            });

        }

        await QuizAttempt.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Quiz attempt deleted successfully."

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