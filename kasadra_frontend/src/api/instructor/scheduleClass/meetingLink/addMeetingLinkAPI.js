import api from "../../../axiosInstance";

// Fetch all courses
export const fetchCoursesAPI = async () => {
  try {
    const res = await api.get("courses/all", {
      headers: { "X-Role": "instructor" },
    });
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

// Fetch batches for a course
export const fetchBatchesAPI = async (courseId) => {
  if (!courseId) throw new Error("courseId is required");
  try {
    const res = await api.get(`batches/by-course/${courseId}`, {
      headers: { "X-Role": "instructor" },
    });
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching batches:", err);
    return [];
  }
};

// Save a new meeting link
export const saveMeetingLinkAPI = async ({
  instructor_id,
  course_id,
  batch_id,
  meeting_url,
}) => {
  try {
    const res = await api.post(
      "/meeting-links",
      { instructor_id, course_id, batch_id, meeting_url },
      { headers: { "X-Role": "instructor" } }
    );
    return res.data;
  } catch (err) {
    console.error("Error saving meeting link:", err);
    throw err;
  }
};
