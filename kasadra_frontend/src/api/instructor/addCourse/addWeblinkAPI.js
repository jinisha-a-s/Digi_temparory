import api from "../../axiosInstance.js";

// Upload Weblink API
export const uploadWeblinkAPI = async (linkData) => {
    try {
        const response = await api.post("/contents/add/weblink", linkData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Role": "instructor",
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Weblink Upload Error:", error?.response?.data || error);
        throw error?.response?.data || { message: "Weblink upload failed" };
    }
};
