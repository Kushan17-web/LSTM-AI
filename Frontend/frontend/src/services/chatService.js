import api from "./api";

export const askCoach=async(question)=>{

const {data}=await api.post(

"/chat",

{question}

);

return data;

};

export const getChats=async()=>{

const {data}=await api.get(

"/chat"

);

return data;

};