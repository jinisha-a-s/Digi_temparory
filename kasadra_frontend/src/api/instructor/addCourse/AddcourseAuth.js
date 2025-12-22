import api from "../../axiosInstance.js";

// ✅ Add a new course (send multipart/form-data)
export const addCourseAPI = async (formData) => {
  // Log the FormData entries for debugging
  console.log("Payload sending:", Object.fromEntries(formData.entries()));

  const response = await api.post("/courses/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ must be this
      "X-Role": "instructor",
    },
    withCredentials: true,
  });

  return response.data;
};
//----------------------------------
//  GET ALL COURSES FOR INSTRUCTOR  -- 
//----------------------------------

export const getInstructorCoursesAPI = async () => {
  const response = await api.get("/courses/all", {
    headers: { "X-Role": "instructor" },
    withCredentials: true,
  });
  return response.data;
};
