import api from "../../../axiosInstance.js";

export const getScheduleClassAPI = async (studentId, courseId) => {
  try {
    const response = await api.get(
      `/scheduleclass/student/${studentId}/${courseId}`, // ❗ No trailing slash
      { headers: { "X-Role": "student" } }
    );

    console.log("📅 API CALLED:", { studentId, courseId });
    console.log("📌 RESPONSE:", response.data);

    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error fetching schedule:", error.response?.data || error.message);
    throw error.response?.data || new Error(error.message);
  }
};
