import api from "./api";

// Get Lessons
export const getLessons = async (courseId) => {
    const { data } = await api.get(`/lessons/${courseId}`);
    return data;
};

// Add Lesson
export const addLesson = async (courseId, lesson) => {
    const { data } = await api.post(`/lessons/${courseId}`, lesson);
    return data;
};

// Update Lesson
export const updateLesson = async (courseId, lessonId, lesson) => {
    const { data } = await api.put(
        `/lessons/${courseId}/${lessonId}`,
        lesson
    );
    return data;
};

// Delete Lesson
export const deleteLesson = async (courseId, lessonId) => {
    const { data } = await api.delete(
        `/lessons/${courseId}/${lessonId}`
    );
    return data;
};

