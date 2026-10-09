const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const getQuestionDistribution = (analytics) => {

    if (!analytics) {
        return {
            easy: 10,
            medium: 5,
            hard: 0,
        };
    }

    const score = analytics.averageScore || 0;

    if (score >= 90) {
        return {
            easy: 2,
            medium: 5,
            hard: 13,
        };
    }

    if (score >= 75) {
        return {
            easy: 5,
            medium: 8,
            hard: 7,
        };
    }

    if (score >= 60) {
        return {
            easy: 8,
            medium: 8,
            hard: 4,
        };
    }

    return {
        easy: 12,
        medium: 6,
        hard: 2,
    };
};

const generateAdaptiveQuestions = (
    questions,
    analytics
) => {

    const distribution =
        getQuestionDistribution(analytics);

    const easy = shuffle(
        questions.filter(
            q => q.difficulty === "Easy"
        )
    ).slice(0, distribution.easy);

    const medium = shuffle(
        questions.filter(
            q => q.difficulty === "Medium"
        )
    ).slice(0, distribution.medium);

    const hard = shuffle(
        questions.filter(
            q => q.difficulty === "Hard"
        )
    ).slice(0, distribution.hard);

    return shuffle([
        ...easy,
        ...medium,
        ...hard
    ]);
};

module.exports = {

    generateAdaptiveQuestions

};