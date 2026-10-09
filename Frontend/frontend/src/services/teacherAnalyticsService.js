import api from "./api";

export const getTeacherAnalytics=async()=>{

const {data}=await api.get(

"/teacher-analytics"

);

return data;

};