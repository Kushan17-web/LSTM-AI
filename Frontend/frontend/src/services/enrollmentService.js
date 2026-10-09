import api from "./api";

export const enrollCourse = async (courseId) => {
    const { data } = await api.post(`/enrollments/${courseId}`);
    return data;
};

export const getMyEnrollments = async () => {
    const { data } = await api.get("/enrollments/my");
    return data;
};