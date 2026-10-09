import api from "./api";

export const getCertificates = async () => {

    const { data } = await api.get("/certificates");

    return data;

};

export const generateCertificate = async (
    course,
    score
) => {

    const { data } = await api.post(
        "/certificates",
        {
            course,
            score,
        }
    );

    return data;

};