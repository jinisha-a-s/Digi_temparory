


// // src/features/student/studentCalendarSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getScheduleClassAPI } from "../../../../api/student/myCourse/existingCourse/studentCalenderAPI.js";

// // Thunk to fetch schedule for a specific student and course
// export const fetchSchedule = createAsyncThunk(
//   "calendar/fetchSchedule",
//   async ({ studentId, courseId }, { rejectWithValue }) => {
//     try {
//       const data = await getScheduleClassAPI(studentId, courseId);
//       return data.map((lesson) => ({
//         id: lesson.calendar_id,
//         title: lesson.lesson_title,
//         date: lesson.select_date,
//         day: lesson.day,
//         start: lesson.start_time,
//         end: lesson.end_time,
//         batch: lesson.batch_name,
//       }));
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const studentCalendarSlice = createSlice({
//   name: "calendar",
//   initialState: {
//     lessons: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSchedule.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSchedule.fulfilled, (state, action) => {
//         state.lessons = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchSchedule.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//       });
//   },
// });

// export default studentCalendarSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getScheduleClassAPI } from "../../../../api/student/myCourse/existingCourse/studentCalenderAPI.js";

export const fetchSchedule = createAsyncThunk(
  "calendar/fetchSchedule",
  async ({ studentId, courseId }, { rejectWithValue }) => {
    try {
      const data = await getScheduleClassAPI(studentId, courseId);
      return data.map((lesson) => ({
        id: lesson.calendar_id,
        title: lesson.lesson_title,
        date: lesson.select_date,
        day: lesson.day,
        start: lesson.start_time.slice(0, 5), // convert "15:23:00:00" → "15:23"
        end: lesson.end_time.slice(0, 5),     // convert "15:50:00:00" → "15:50"
        batch: lesson.batch_name,
      }));

    } catch (error) {
      return rejectWithValue(error?.detail || error?.message || "Something went wrong");
    }
  }
);

const studentCalendarSlice = createSlice({
  name: "calendar",
  initialState: {
    lessons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentCalendarSlice.reducer;
