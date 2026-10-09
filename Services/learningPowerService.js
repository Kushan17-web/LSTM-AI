exports.calculateLearningPower = (student) => {

    let score = 0;

    score += student.quizScore * 0.30;

    score += student.assignmentScore * 0.20;

    score += student.attendance * 0.10;

    score += student.completionRate * 0.20;

    score += student.engagement * 0.10;

    score += student.timeSpent * 0.05;

    score += student.revisionCount * 0.05;

    return Math.round(score);

};