import api from "./api";

// ==============================
// Get All Courses
// ==============================

export const getCourses = async () => {

    const { data } = await api.get("/courses");

    return data;

};

// ==============================
// Get Single Course
// ==============================

export const getCourse = async (id) => {

    const { data } = await api.get(`/courses/${id}`);

    return data;

};

// ==============================
// Create Course
// ==============================

export const createCourse = async (course) => {

    const { data } = await api.post("/courses", course);

    return data;

};

// ==============================
// Update Course
// ==============================

export const updateCourse = async (id, course) => {

    const { data } = await api.put(`/courses/${id}`, course);

    return data;

};

// ==============================
// Delete Course
// ==============================

export const deleteCourse = async (id) => {

    const { data } = await api.delete(`/courses/${id}`);

    return data;

};

// ==============================
// Enroll Student
// ==============================

export const enrollCourse = async (id) => {

    const { data } = await api.post(`/courses/enroll/${id}`);

    return data;

};