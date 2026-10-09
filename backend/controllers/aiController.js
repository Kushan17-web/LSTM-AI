const Student = require("../models/Student");

const {
    calculateLearningPower
} = require("../services/learningPowerService");

const {
    getRecommendation
} = require("../services/recommendationService");

const {
    predictCategory
} = require("../services/pythonService");

exports.generateCategory = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const learningPower = calculateLearningPower(student);

        const category = await predictCategory({

            quizScore: student.quizScore,
            assignmentScore: student.assignmentScore,
            attendance: student.attendance,
            completionRate: student.completionRate,
            engagement: student.engagement,
            learningSpeed: student.learningSpeed,
            consistency: student.consistency,
            improvementTrend: student.improvementTrend,
            knowledgeRetention: student.knowledgeRetention

        });

        const recommendation = getRecommendation(category);

        student.learningPower = learningPower;
        student.category = category;
        student.recommendation = recommendation.learningPath;

        await student.save();

        res.status(200).json({

            success: true,

            learningPower,

            category,

            recommendation,

            student

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};