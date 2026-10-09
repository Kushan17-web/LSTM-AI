import api from "./api";

// ======================================
// Submit Quiz
// ======================================

export const submitQuiz = async (

    quizId,

    answers,

    completedIn

) => {

    const { data } = await api.post(

        `/attempts/${quizId}`,

        {

            answers,

            completedIn

        }

    );

    return data;

};