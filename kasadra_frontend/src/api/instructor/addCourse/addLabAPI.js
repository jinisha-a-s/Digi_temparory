import api from "../../axiosInstance.js";

export const addLabAPI = async (labData) => {
  try {
    const response = await api.post("contents/add/lab", labData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Role": "instructor",
      },
    });

    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to add lab";

    throw new Error(message);
  }
};
