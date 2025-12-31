import api from "../../axiosInstance";

/* ============================= */
/* Fetch ALL lessons by course */
/* ============================= */

export const getLessonsAPI = async (courseId) => {
  const response = await api.get(`/lessons/all/${courseId}`, {
    headers: { "X-Role": "instructor" },
  });

  return response.data?.lessons || [];
};

/* ============================= */
/* Delete lesson */
/* ============================= */

export const deleteLessonAPI = async (lessonId) => {
  const response = await api.delete(`/lessons/delete/${lessonId}`, {
    headers: { "X-Role": "instructor" },
  });

  return response.data;
};
