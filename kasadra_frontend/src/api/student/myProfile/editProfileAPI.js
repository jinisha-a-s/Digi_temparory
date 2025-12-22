import api from "../../axiosInstance";

export const updateInstructorProfileAPI = async (studentId, formData) => {
    try {
        const response = await api.put(
            `/student/${studentId}`,
            formData, // ✅ send plain object, not stringified
            {
                headers: {
                    "Content-Type": "application/json", // ✅ correct
                    "X-Role": "student",
                },
            }
        );
        return response.data.detail?.data || response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update profile" };
    }
};
