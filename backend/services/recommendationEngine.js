const getRecommendation = (prediction) => {
    switch (prediction) {
        case "Fast Learner":
            return "Proceed to Advanced Lessons";

        case "Average Learner":
            return "Practice More Quizzes";

        default:
            return "Revise Previous Lessons Before Continuing";
    }
};

module.exports = { getRecommendation };