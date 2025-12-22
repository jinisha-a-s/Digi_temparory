import api from "../../axiosInstance";

// Get single student by ID
export const fetchUserProfileAPI = async (studentId) => {
  try {
    const response = await api.get(`/student/${studentId}`, {
      headers: { "X-Role": "student" }, // ✅ required for interceptor
    });
    // The data is under response.data.detail.data
    return response.data.detail.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};
