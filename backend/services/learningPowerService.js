// services/learningPowerService.js

exports.calculateLearningPower = (student) => {

    const score = (

        student.quizScore * 0.25 +

        student.assignmentScore * 0.15 +

        student.attendance * 0.10 +

        student.completionRate * 0.15 +

        student.engagement * 0.10 +

        student.learningSpeed * 0.10 +

        student.consistency * 0.05 +

        student.improvementTrend * 0.05 +

        student.knowledgeRetention * 0.05

    );

    return Number(score.toFixed(2));

};
const QuizAttempt = require("../models/QuizAttempt");

exports.calculateLearningPower = async (studentId) => {

    const attempts = await QuizAttempt.find({
        student: studentId
    });

    if (attempts.length === 0) {

        return {
            learningPower: 0,
            category: "New Student",
            strengths: [],
            weaknesses: [],
            recommendation: "Complete your first quiz."
        };

    }

    const avgScore =
        attempts.reduce((sum, a) => sum + a.percentage, 0) /
        attempts.length;

    const avgTime =
        attempts.reduce((sum, a) => sum + a.completedIn, 0) /
        attempts.length;

    let learningPower =
        avgScore * 0.7 +
        Math.max(0, 100 - avgTime / 10) * 0.3;

    learningPower = Math.round(learningPower);

    let category = "";

    if (learningPower >= 90)
        category = "Expert Learner";

    else if (learningPower >= 75)
        category = "Fast Learner";

    else if (learningPower >= 60)
        category = "Average Learner";

    else if (learningPower >= 40)
        category = "Needs Practice";

    else
        category = "At Risk";

    return {

        learningPower,

        category,

        averageScore: avgScore,

        averageTime: avgTime,

        quizzesCompleted: attempts.length,

        strengths:
            avgScore >= 75
                ? ["Problem Solving", "Consistency"]
                : ["Participation"],

        weaknesses:
            avgScore < 60
                ? ["Concept Understanding"]
                : [],

        recommendation:
            avgScore >= 75
                ? "Move to next level."
                : "Revise previous lessons."

    };

};