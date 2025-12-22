import api from "../../../axiosInstance.js";

// Fetch courses
export const getCoursesAPI = async () => {
  const response = await api.get("/courses/all", {
    headers: { "X-Role": "student" },
  });
  return response.data.data;
};

// Enroll in course
export const enrollCourseAPI = async (courseId) => {
  const response = await api.post(`/student/enroll/${courseId}`, {}, {
    headers: { "X-Role": "student" },
  });
  return response.data;
};
