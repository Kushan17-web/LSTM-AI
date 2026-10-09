const LearningAnalytics = require("../models/LearningAnalytics");

// ======================================
// Leaderboard
// ======================================

exports.getLeaderboard = async (req, res) => {

    try {

        const leaderboard = await LearningAnalytics
            .find()
            .populate(

                "student",

                "name email profilePicture"

            )
            .sort({

                xp: -1,

                averageScore: -1

            });

        leaderboard.forEach(

            (student, index) => {

                student.rank = index + 1;

            }

        );

        res.json({

            success: true,

            leaderboard

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};