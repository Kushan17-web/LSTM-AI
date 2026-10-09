// services/recommendationService.js

exports.getRecommendation = (category) => {

    switch (category) {

        case "Fast Learner":

            return {

                learningPath: "Advanced",

                recommendations: [

                    "Advanced AI Course",

                    "Competitive Programming",

                    "Research Projects",

                    "Case Studies"

                ]

            };

        case "Average Learner":

            return {

                learningPath: "Standard",

                recommendations: [

                    "Practice Questions",

                    "Weekly Revision",

                    "Assignments",

                    "Topic-wise Tests"

                ]

            };

        default:

            return {

                learningPath: "Support",

                recommendations: [

                    "Beginner Videos",

                    "Extra Practice",

                    "Teacher Mentoring",

                    "Revision Notes"

                ]

            };

    }

};
const generateRecommendation = (analytics) => {
    const score = analytics.averageScore || 0;
    const power = analytics.learningPower || 0;
    const streak = analytics.streak || 0;

    let title = "";
    let message = "";
    let priority = "";

    if (score >= 90) {
        title = "Outstanding Performance 🚀";
        message =
            "You're consistently scoring above 90%. Try harder quizzes to keep improving.";
        priority = "low";
    } else if (score >= 75) {
        title = "Good Progress 👍";
        message =
            "You're doing well. Focus on your weaker topics to reach excellence.";
        priority = "medium";
    } else if (score >= 60) {
        title = "Needs Improvement 📚";
        message =
            "Revise previous lessons before attempting more quizzes.";
        priority = "high";
    } else {
        title = "Immediate Attention ⚠️";
        message =
            "Your recent performance indicates you should revisit the course fundamentals.";
        priority = "critical";
    }

    if (streak >= 7) {
        message += " Amazing consistency! Keep your learning streak alive.";
    }

    if (power >= 85) {
        message += " Your learning power is excellent.";
    }

    return {
        title,
        message,
        priority,
    };
};

module.exports = {
    generateRecommendation,
};