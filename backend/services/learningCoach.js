const generateLearningCoach = (
    quiz,
    answers,
    analytics,
    percentage
) => {

    let strongTopics = {};
    let weakTopics = {};

    quiz.questions.forEach((question, index) => {

        const answer = answers[index];

        if (!answer) return;

        if (answer.correct) {

            strongTopics[question.topic] =
                (strongTopics[question.topic] || 0) + 1;

        } else {

            weakTopics[question.topic] =
                (weakTopics[question.topic] || 0) + 1;

        }

    });

    const strongest =
        Object.keys(strongTopics)
            .sort(
                (a, b) =>
                    strongTopics[b] -
                    strongTopics[a]
            )[0] || "None";

    const weakest =
        Object.keys(weakTopics)
            .sort(
                (a, b) =>
                    weakTopics[b] -
                    weakTopics[a]
            )[0] || "None";

    let studyTime = 20;

    if (percentage < 60)
        studyTime = 60;

    else if (percentage < 80)
        studyTime = 40;

    const estimatedScore =
        Math.min(
            100,
            Math.round(
                percentage + 10
            )
        );

    return {

        strongestTopic: strongest,

        weakestTopic: weakest,

        recommendedStudyTime:
            studyTime,

        estimatedNextScore:
            estimatedScore,

        confidence:
            analytics?.learningPower || percentage

    };

};

module.exports = {

    generateLearningCoach

};