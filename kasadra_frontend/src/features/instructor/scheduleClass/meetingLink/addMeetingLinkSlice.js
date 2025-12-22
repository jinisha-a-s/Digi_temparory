import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCoursesAPI,
  fetchBatchesAPI,
} from "../../../../api/instructor/scheduleClass/meetingLink/addMeetingLinkAPI";

// Load courses
export const loadCourses = createAsyncThunk(
  "addMeetingLink/loadCourses",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCoursesAPI();
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load courses");
    }
  }
);

// Load batches
export const loadBatches = createAsyncThunk(
  "addMeetingLink/loadBatches",
  async (courseId, { rejectWithValue }) => {
    try {
      return await fetchBatchesAPI(courseId);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to load batches");
    }
  }
);

const addMeetingLinkSlice = createSlice({
  name: "addMeetingLink",
  initialState: {
    courses: [],
    batches: [],
    loadingCourses: false,
    loadingBatches: false,
    errorCourses: null,
    errorBatches: null,
  },
  reducers: {
    clearBatches(state) {
      state.batches = [];
      state.errorBatches = null;
      state.loadingBatches = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Courses
      .addCase(loadCourses.pending, (state) => {
        state.loadingCourses = true;
        state.errorCourses = null;
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.loadingCourses = false;
        state.courses = action.payload;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.loadingCourses = false;
        state.errorCourses = action.payload;
      })

      // Batches
      .addCase(loadBatches.pending, (state) => {
        state.loadingBatches = true;
        state.errorBatches = null;
      })
      .addCase(loadBatches.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.batches = action.payload;
      })
      .addCase(loadBatches.rejected, (state, action) => {
        state.loadingBatches = false;
        state.errorBatches = action.payload;
      });
  },
});

export const { clearBatches } = addMeetingLinkSlice.actions;
export default addMeetingLinkSlice.reducer;
