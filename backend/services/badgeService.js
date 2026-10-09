const getBadges = (
    previousBadges = [],
    percentage,
    quizzesCompleted,
    level
) => {
    const badges = [...previousBadges];

    if (percentage === 100 && !badges.includes("Perfect Score")) {
        badges.push("Perfect Score");
    }

    if (quizzesCompleted >= 10 && !badges.includes("Quiz Master")) {
        badges.push("Quiz Master");
    }

    if (level >= 5 && !badges.includes("Level 5")) {
        badges.push("Level 5");
    }

    return badges;
};

module.exports = { getBadges };