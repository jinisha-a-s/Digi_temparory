import api from "../../axiosInstance.js";

// ✅ Fetch all courses for dropdown
export const getCoursesAPI = async () => {
  const response = await api.get("/courses/all", {
    headers: { "X-Role": "instructor" },
  });
  return response.data?.data || []; // ✅ return the courses array

  console.log("Courses fetched:", response.data?.data);
  
};


// ✅ Fetch batches for a specific course
export const getBatchesAPI = async (courseId) => {
  try {
    const response = await api.get(`/batches/by-course/${courseId}`, {
      headers: { "X-Role": "instructor" },
    });

    // ✅ Backend returns data under "data"
    const batches = response.data?.data || [];

    console.log("✅ Batches fetched successfully:", batches);
    return batches;
  } catch (error) {
    console.error(`❌ Error fetching batches for courseId ${courseId}:`, error);
    return [];
  }
};

// ✅ FIXED getScheduleClassAPI
export const getScheduleClassAPI = async (courseId, batchId) => {
  try {
    console.log("📡 Calling API for:", { courseId, batchId });

    const response = await api.get(`/scheduleclass/view/${courseId}`, {
      headers: { "X-Role": "instructor" },
      params: { batch_id: batchId },
    });

    console.log("✅ API Response for getScheduleClassAPI:", response.data);
    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error in getScheduleClassAPI:", error);
    throw error;
  }
};




// ✅ Update schedule (PUT)
export const updateScheduleClassAPI = async (calendarId, scheduleData) => {
  const formattedData = {
    batch_id: Number(scheduleData.batch_id),
    lesson_id: Number(scheduleData.lesson_id),
    select_date: scheduleData.select_date,
    day: new Date(scheduleData.select_date).toLocaleDateString("en-US", { weekday: "long" }),
    start_time: scheduleData.start_time,
    end_time: scheduleData.end_time,
  };

  const response = await api.put(`/scheduleclass/update/${calendarId}`, formattedData, {
    headers: { "X-Role": "instructor", "Content-Type": "application/json" },
  });

  return response.data;
};    