// src/api/studentAPI.js

import api from "../../axiosInstance.js";

// Fetch single student details (by instructor)  -- UserManagement -- view student details

export const getStudentDetailsAPI = async (studentId) => {
  const res = await api.get(`/student/${studentId}`, {
    headers: { "X-Role": "instructor" }, // 👈 token auto-attached by interceptor
  });
  return res.data.detail.data; // adjust if your backend response is different
};
