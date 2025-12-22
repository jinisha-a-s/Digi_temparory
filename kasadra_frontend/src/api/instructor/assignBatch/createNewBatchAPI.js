// src/api/courseAPI.js
import api from "../../axiosInstance.js"; // your axios instance

// GET all courses
export const getAllCoursesAPI = async () => {
  try {
    const response = await api.get("courses/all"); // endpoint
    if (!response.data) throw new Error("No data returned from server");
    return response.data.data; // returning only the 'data' array
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Failed to fetch courses";
    throw new Error(message);
  }
};

// POST new batch
// src/api/createBatchAPI.js

export const createBatchAPI = async (batchData) => {
  try {
    // batchData should be in the format expected by backend
    const response = await api.post("batches/add", batchData, {
      headers: {
        "X-Role": "instructor",
        "Content-Type": "application/json", // sending JSON
      },
    });

    if (!response.data) throw new Error("No data returned from server");
    return response.data;
  } catch (err) {
    const message = err.response?.data?.detail || // <-- use `detail` instead of `message`
      err.response?.data?.message ||
      err.message ||
      "Failed to create batch";
    throw new Error(message);
  }
};
