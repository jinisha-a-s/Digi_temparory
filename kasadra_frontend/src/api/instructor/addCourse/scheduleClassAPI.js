// import api from "../../axiosInstance.js"; // ✅ your axios instance

// // Add schedule class
// export const addScheduleClassAPI = async (scheduleData) => {
//   try {
//     const response = await api.post("scheduleclass/add", scheduleData, {
//       headers: {
//         "X-Role": "instructor",
//         "Content-Type": "application/json", // since we send JSON, not form-data
//       },
//     });

//     if (!response.data) throw new Error("No data returned from server");

//     return response.data; // return only the data
//   } catch (err) {
//     const message =
//       err.response?.data?.message || err.message || "Failed to schedule class";
//     throw new Error(message);
//   }
// };



// // ✅ Fetch lessons for a course
// export const getLessonsAPI = async (courseId) => {
//   try {
//     const response = await api.get("lessons/all", {
//       headers: { "X-Role": "instructor" },
//       params: { course_id: courseId },
//     });

//     // Map only id and title
//     const lessons = response.data?.data?.map((lesson) => ({
//       id: lesson.id,
//       title: lesson.title,
//     })) || [];

//     return lessons;
//   } catch (err) {
//     throw new Error(err.response?.data?.message || err.message || "Failed to fetch lessons");
//   }
// };

import api from "../../axiosInstance.js"; // ✅ axios instance

// ✅ Fetch lessons for a course
export const getLessonsAPI = async (courseId) => {
  try {
    const response = await api.get(`lessons/all/${courseId}`, {
      headers: { "X-Role": "instructor" },
      params: { course_id: courseId },
    });

    const lessons =
      response.data?.lessons?.map((lesson) => ({
        id: lesson.lesson_id,   // ✅ correct backend key
        title: lesson.title,    // ✅ correct backend key
      })) || [];

    return lessons;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch lessons"
    );
  }
};

// ✅ Fetch batches for a course
export const getBatchesAPI = async (courseId) => {
  try {
    const response = await api.get(`batches/by-course/${courseId}`, {
      headers: { "X-Role": "instructor" },
    });

    const batches =
      response.data?.data?.map((batch) => ({
        id: batch.batch_id,
        name: batch.batch_name,
        course_name: batch.course_name,
        num_students: batch.num_students,
        timing: batch.timing,
        start_date: batch.start_date,
      })) || [];

    return batches;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch batches");
  }
};




// ✅ Add schedule class (final working version)
export const addScheduleClassAPI = async (scheduleData) => {
  try {
    const date = scheduleData.session_date; // "YYYY-MM-DD"

    const formattedData = {
      course_id: Number(scheduleData.course_id),
      lesson_id: Number(scheduleData.lesson_id),
      batch_id: Number(scheduleData.batch_id),
      select_date: date,
      day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
      start_date: date, // ✅ just the date
      end_date: date,   // ✅ just the date
      start_time: `${scheduleData.start_time}:00`, // time separately
      end_time: `${scheduleData.end_time}:00`,     // time separately
    };

    const response = await api.post("scheduleclass/add", formattedData, {
      headers: {
        "X-Role": "instructor",
        "Content-Type": "application/json",
      },
    });

    if (!response.data) throw new Error("No data returned from server");
    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.detail ||
      err.message ||
      "Failed to schedule class";
    throw new Error(message);
  }
};
