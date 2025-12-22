// src/api/auth.js
import api from "../axiosInstance.js";

// await api.get("/courses", { headers: { "X-Role": "student" } }); 
// add this type of header for upcoming API calls

// Helper to extract token and data safely
const extractStudentData = (data) => {
  const detailData = data?.detail?.data || {};
  return {
    id: detailData.id,
    studentName: detailData.studentName,
    token: detailData.access_token,
    tokenType: detailData.token_type,
  };
};

// ------ ✅ Register Student

export const registerStudentAPI = async (formData) => {
  const payload = {
    Name: formData.name,
    Email: formData.email,
    "Phone No": formData.phone_no,
    Password: formData.password,
    "Confirm Password": formData.confirm_password,
    "created_at": new Date().toISOString().split("T")[0]
  };

  try {
    const response = await api.post("/student/create", payload);
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid server response. Please try again later.");
    }
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.detail?.message ||
      err?.response?.data?.message ||
      err.message ||
      "Registration failed. Please try again later."
    );
  }
};



// ------ ✅ Login Student


export const loginStudentAPI = async (formData) => {
  const payload = { Email: formData.email, Password: formData.password };

  try {
    const response = await api.post("/student/login", payload);
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid server response. Please try again later.");
    }
    return extractStudentData(response.data);
  } catch (err) {
    throw new Error(
      err?.response?.data?.detail?.message ||
      err?.response?.data?.message ||
      err.message ||
      "Login failed. Please try again later."
    );
  }
};

// ------ ✅ Register Instructor
export const registerInstructorAPI = async (formData) => {
  const payload = {
    "Name": formData.name,
    "Email": formData.email,
    "Phone No": formData.phone_no,
    "Password": formData.password,
    "Confirm Password": formData.confirm_password,
    "created_at": new Date().toISOString().split("T")[0]
  };

  try {
    const response = await api.post("/instructor/create", payload);

    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid server response. Please try again later.");
    }

    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data?.detail?.message || // detailed backend message
      err?.response?.data?.message ||        // fallback message
      err.message ||                          // JS error message
      "Registration failed. Please try again later."
    );
  }
};

// ------ ✅ Login Instructor

export const loginInstructorAPI = async (formData) => {
  const payload = { Email: formData.email, Password: formData.password };

  try {
    const response = await api.post("instructor/login", payload);

    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid server response. Please try again later.");
    }

    const detailData = response.data?.detail?.data || {};

    return {
      id: detailData.id,
      instructorName: detailData.instructorName,
      token: detailData.access_token,
      tokenType: detailData.token_type,
    };
  } catch (err) {
    throw new Error(
      err?.response?.data?.detail?.message ||
      err?.response?.data?.message ||
      err.message ||
      "Login failed. Please try again later."
    );
  }
};

// ------ ✅ Get Instructor Profile

export const getInstructorProfileAPI = async () => {
  const response = await api.get("/instructor/all", {
    headers: { "X-Role": "instructor" }
  });
  return response.data;
};




