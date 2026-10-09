const calculateXP = (percentage) => {
    let xp = Math.round(percentage);

    if (percentage === 100) xp += 100;
    if (percentage >= 90) xp += 30;
    else if (percentage >= 75) xp += 15;
    else if (percentage >= 60) xp += 10;

    return xp;
};

module.exports = { calculateXP };