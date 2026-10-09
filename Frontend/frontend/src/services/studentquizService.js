import api from "./api";

// Start Adaptive Quiz
export const startAdaptiveQuiz = async (id) => {
    const { data } = await api.get(`/quizzes/${id}/start`);
    return data;
};

// Submit Adaptive Quiz
export const submitAdaptiveQuiz = async (
    id,
    answers,
    completedIn
) => {
    const { data } = await api.post(
        `/quizzes/${id}/submit`,
        {
            answers,
            completedIn,
        }
    );

    return data;
};

// Get All Quizzes
export const getQuizzes = async () => {
    const { data } = await api.get("/quizzes");
    return data;
};

// Get Single Quiz
export const getQuiz = async (id) => {
    const { data } = await api.get(`/quizzes/${id}`);
    return data;
};

// Create Quiz
export const createQuiz = async (quiz) => {
    const { data } = await api.post("/quizzes", quiz);
    return data;
};

// Update Quiz
export const updateQuiz = async (id, quiz) => {
    const { data } = await api.put(`/quizzes/${id}`, quiz);
    return data;
};

// Delete Quiz
export const deleteQuiz = async (id) => {
    const { data } = await api.delete(`/quizzes/${id}`);
    return data;
};