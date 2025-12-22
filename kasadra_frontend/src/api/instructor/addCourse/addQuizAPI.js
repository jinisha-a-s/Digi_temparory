import api from "../../axiosInstance.js";

export const addQuizAPI = async (quizData) => {
  try {
    const response = await api.post("contents/add/quiz", quizData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Role": "instructor",
      },
    });

    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to add quiz";

    throw new Error(message);
  }
};
