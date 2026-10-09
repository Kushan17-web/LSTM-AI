// backend/services/studyPlannerService.js

function generateStudyPlan(analytics = {}) {
    const averageScore = analytics.averageScore || 0;
    const weakTopics = analytics.weakTopics || [];

    let recommendedStudyTime = 60;

    if (averageScore >= 90) {
        recommendedStudyTime = 30;
    } else if (averageScore >= 75) {
        recommendedStudyTime = 45;
    } else if (averageScore >= 50) {
        recommendedStudyTime = 60;
    } else {
        recommendedStudyTime = 90;
    }

    const plan = [];

    if (weakTopics.length === 0) {
        plan.push("Revise your recent topics.");
        plan.push("Attempt one practice quiz.");
        plan.push("Read notes for 30 minutes.");
    } else {
        weakTopics.forEach((topic) => {
            plan.push(`Study ${topic} for 30 minutes.`);
            plan.push(`Solve practice questions for ${topic}.`);
        });
    }

    return {
        recommendedStudyTime,
        plan,
    };
}

module.exports = {
    generateStudyPlan,
};