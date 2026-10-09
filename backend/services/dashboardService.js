import api from "./api";

export const getTeacherDashboard = async () => {

    const { data } = await api.get("/dashboard/teacher");

    return data;

};