
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCoursesAPI,
  getBatchesAPI,
  getScheduleClassAPI,
  updateScheduleClassAPI,
} from "../../../api/instructor/scheduleClass/scheduleEditorAPI";

// 🧩 Thunks
export const fetchCourses = createAsyncThunk(
  "lessonSchedule/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const courses = await getCoursesAPI();
      return courses; // ✅ already the array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchBatches = createAsyncThunk(
  "lessonSchedule/fetchBatches",
  async (courseId) => {
    const data = await getBatchesAPI(courseId);
    console.log("Fetched batches for courseId", courseId, data);
    return data;
  }
);



export const fetchSchedule = createAsyncThunk(
  "lessonSchedule/fetchSchedule",
  async ({ courseId, batchId }) => {
    const data = await getScheduleClassAPI(courseId, batchId);
    return data;
  }
);

export const updateSchedule = createAsyncThunk(
  "lessonSchedule/updateSchedule",
  async ({ calendarId, scheduleData }) => {
    const response = await updateScheduleClassAPI(calendarId, scheduleData);
    console.log("Update response:", response);

    return response;
  }
);

// 🧩 Slice
const lessonScheduleSlice = createSlice({
  name: "lessonSchedule",
  initialState: {
    courses: [],
    batches: [],
    lessons: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLessons: (state) => {
      state.lessons = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Courses ---
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Fetch Batches ---
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize to {id, name}
        state.batches = action.payload.map(b => ({
          id: b.batch_id,
          name: b.batch_name
        }));
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Fetch Schedule ---
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false;
        // Map backend response to frontend table format
        state.lessons = action.payload.map(item => ({
          calendar_id: item.calendar_id,
          lesson_title: item.lesson_title,
          lesson_id: item.lesson_id,
          name: item.lesson_title || `Lesson ${item.lesson_id}`,
          batch_id: item.batch_id,
          day: item.day,
          select_date: item.select_date,
          start_time: item.start_time, // backend start_date
          end_time: item.end_time,     // backend end_date
        }));
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // --- Update Schedule ---
      // --- Update Schedule ---
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;
        const index = state.lessons.findIndex(l => l.calendar_id === updated.calendar_id);
        if (index !== -1) {
          state.lessons[index] = {
            ...state.lessons[index],
            day: updated.day,
            select_date: updated.select_date,
            start_time: updated.start_time,  // keep in sync with backend fields
            end_time: updated.end_time,
            // start_time: item.start_time ? item.start_time.slice(0, 5) : "",
            // end_time: item.end_time ? item.end_time.slice(0, 5) : "",
          };
        }
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }

});

export const { clearLessons } = lessonScheduleSlice.actions;
export default lessonScheduleSlice.reducer;


