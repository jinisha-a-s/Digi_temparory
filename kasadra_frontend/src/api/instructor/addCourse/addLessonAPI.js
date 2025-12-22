// src/api/instructor/addCourse/addLessonAPI.js
import api from "../../axiosInstance.js";

export const addLessonAPI = async (lessonData) => {
  try {
    const response = await api.post("lessons/add", lessonData, {
      headers: {
        "X-Role": "instructor",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("addLessonAPI error:", err);
    const message = err.response?.data?.message || err.message || "Failed to add lesson";
    throw new Error(message);
  }
};
