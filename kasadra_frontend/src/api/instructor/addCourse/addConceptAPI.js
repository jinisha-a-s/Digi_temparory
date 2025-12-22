
import api from "../../axiosInstance.js"; // your axios instance

export const addConceptAPI = async (conceptData) => {
  try {
    const response = await api.post("concepts/add", conceptData, {
      headers: {
        "X-Role": "instructor",
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) throw new Error("No data returned from server");

    return response;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to add concept";
    throw new Error(message);
  }
};

