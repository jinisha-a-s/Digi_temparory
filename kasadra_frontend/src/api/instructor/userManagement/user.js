import api from "../../axiosInstance.js";

export const getAllStudentsAPI = async () => {
  try {
    const response = await api.get("student/all", {
      headers: { "X-Role": "instructor" }
    });

    // ✅ simpler + safer check
    const students = response.data?.detail?.data;
    if (!Array.isArray(students)) {
      return []; // empty list instead of throwing
    }

    return students;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to fetch students";
    throw new Error(message);
  }
};
