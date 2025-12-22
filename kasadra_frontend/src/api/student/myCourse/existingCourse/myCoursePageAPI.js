import api from "../../../../api/axiosInstance";

export const fetchCoursesForStudent = async (studentId) => {
  const response = await api.get(`/buy/courses/${studentId}`, {
    headers: { "X-Role": "student" },
  });

  return {
    purchased: response.data.purchased_courses || [],
    recommended: response.data.recommended_courses || [],
  };
};
