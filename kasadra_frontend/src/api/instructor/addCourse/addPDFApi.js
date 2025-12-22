import api from "../../axiosInstance.js";

export const uploadPDFAPI = async (formData) => {
  try {
    const response = await api.post("/contents/add/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Role": "instructor",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("❌ PDF Upload Error:", error);
    throw error.response?.data || { message: "PDF upload failed" };
  }
};
