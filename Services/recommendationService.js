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
                    "Real-world Case Studies"
                ]
            };

        case "Average Learner":
            return {
                learningPath: "Standard",
                recommendations: [
                    "Regular Practice",
                    "Weekly Quiz",
                    "Assignments",
                    "Revision Notes"
                ]
            };

        default:
            return {
                learningPath: "Support",
                recommendations: [
                    "Beginner Videos",
                    "Extra Practice Questions",
                    "Concept Revision",
                    "Teacher Mentoring"
                ]
            };
    }

};