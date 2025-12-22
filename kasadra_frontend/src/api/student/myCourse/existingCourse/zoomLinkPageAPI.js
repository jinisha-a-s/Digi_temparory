// src/api/student/zoomLinkPageAPI.js
import api from "../../../../api/axiosInstance";

// GET Zoom meeting link for a student
export const fetchStudentZoomLinkAPI = async (studentId, courseId) => {
  try {
    const response = await api.get(
      `/student/meeting/${studentId}/${courseId}`,
      {
        headers: { "X-Role": "student" },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Unable to fetch meeting link"
    );
  }
};
