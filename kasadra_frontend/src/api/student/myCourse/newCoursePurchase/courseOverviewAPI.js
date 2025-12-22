import api from "../../../../api/axiosInstance";

// Fetch course details by ID
export const fetchCourseDetailsAPI = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`, {
    headers: { "X-Role": "student" },
  });
  return res.data.data; // backend returns {status, data}
};

// Add course to cart
export const addToCartAPI = async (studentId, courseId) => {
  const res = await api.post(`/cart/${studentId}/${courseId}`, null, {
    headers: { "X-Role": "student" },
  });
  return res.data; // {status, message}
};
