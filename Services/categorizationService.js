// services/categorizationService.js

exports.categorizeStudent = (learningPower) => {

    if (learningPower >= 85) {
        return {
            category: "Fast Learner",
            color: "green"
        };
    }

    if (learningPower >= 60) {
        return {
            category: "Average Learner",
            color: "orange"
        };
    }

    return {
        category: "Needs Support",
        color: "red"
    };

};