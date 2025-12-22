

// import api from "../../axiosInstance.js"; // your configured Axios instance

// export const getLessonsAPI = async (courseId) => {
//   try {
//     const response = await api.get(`lessons/all/${courseId}`, {
//       headers: { "X-Role": "instructor" },
//     });

//     console.log("📘 [getLessonsAPI] Response:", response.data);


//     if (Array.isArray(response.data.lessons)) {
//       return response.data.lessons;
//     }

//     // fallback if backend changes

//     // 
//     return [];
//   } catch (err) {
//     const message =
//       err.response?.data?.detail ||
//       err.response?.data?.message ||
//       err.message ||
//       "Failed to fetch lessons";
//     throw new Error(message);
//   }
// };

// /**
//  * Delete a specific lesson by ID
//  * @param {number|string} lessonId - ID of the lesson to delete
//  * @returns {Promise<Object>} - Returns success message or status
//  */
// export const deleteLessonAPI = async (lessonId) => {
//   try {
//     const response = await api.delete(`lessons/delete/${lessonId}`, {
//       headers: { "X-Role": "instructor" },
//     });

//     console.log("🗑️ [deleteLessonAPI] Response:", response.data);


//     return response.data;
//   } catch (err) {
//     const message =
//       err.response?.data?.detail ||
//       err.response?.data?.message ||
//       err.message ||
//       "Failed to delete lesson";
//     throw new Error(message);
//   }
// };

import api from "../../axiosInstance";

// Fetch lessons
// Fetch lessons for a specific batch
export const getLessonsAPI = async (batchId) => {
  const response = await api.get(`/activate/batches/${batchId}/lessons`, {
    headers: { "X-Role": "instructor" },
  });

  return response.data?.lessons || []; // use 'data' because your batch API returns data array
};


// Fetch batches for this course
export const getBatchesAPI = async (courseId) => {
  const response = await api.get(`/batches/by-course/${courseId}`, {
    headers: { "X-Role": "instructor" },
  });

  console.log("BATCH API RESPONSE:", response.data);
  return response.data?.data || [];

};

// Delete lesson
export const deleteLessonAPI = async (lessonId) => {
  const response = await api.delete(`/lessons/delete/${lessonId}`, {
    headers: { "X-Role": "instructor" },
  });

  return response.data;
};

// Activate lesson (ONLY batch_id)
export const activateLessonAPI = async (lessonId, batchId) => {
  const response = await api.post(
    `/activate/batches/${batchId}/lessons/${lessonId}/activate`,
    {},   // EMPTY BODY
    { headers: { "X-Role": "instructor" } }
  );

  return response.data;
};

