// import axios from "axios";

// // ✅ Fetch course details by ID
// export const getCourseDetailsAPI = async (courseId) => {
//   const res = await axios.get(`/courses/${courseId}`);
//   return res.data;
// };



// src/api/instructor/addCourse/viewAPI.js
import api from "../../axiosInstance.js";

// ✅ Fetch course details by ID
export const getCourseDetailsAPI = async (courseId) => {
  const res = await api.get(`/courses/${courseId}`, {
    headers: { "X-Role": "instructor" }, // 👈 match your backend’s role requirement
  });
  console.log("📌 Course API Response:", res.data);
 return res.data;  // 👈 adjust based on actual backend response
};
