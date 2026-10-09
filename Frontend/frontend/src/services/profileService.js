import api from "./api";

// Get Profile
export const getProfile = async () => {
    const { data } = await api.get("/profile");
    return data;
};

// Update Profile
export const updateProfile = async (profile) => {
    const { data } = await api.put("/profile", profile);
    return data;
};