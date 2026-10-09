const { predictCategory } = require("./services/pythonService");

(async () => {

    const prediction = await predictCategory({

        quiz_score: 92,
        assignment_score: 90,
        attendance: 95,
        study_time: 4,
        completion_rate: 96,
        average_quiz_time: 9,
        consistency: 90,
        improvement: 88

    });

    console.log(prediction);

})();