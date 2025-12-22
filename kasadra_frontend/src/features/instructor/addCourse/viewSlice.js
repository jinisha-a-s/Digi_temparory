import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseDetailsAPI } from "../../../api/instructor/addCourse/viewAPI.js";

// Fetch course details
export const fetchCourseDetails = createAsyncThunk(
  "courseDetails/fetchCourseDetails",
  async (courseId, { rejectWithValue }) => {
    try {
      const data = await getCourseDetailsAPI(courseId);
      console.log("✅ Course Details API Response:", data); // <---
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch course details");
    }
  }
);

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState: {
    courseDetails: null,
    courseLoading: false,
    courseError: null,
  },
  reducers: {
    clearCourseData: (state) => {
      state.courseDetails = null;
      state.courseError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        state.courseLoading = true;
        state.courseError = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.courseLoading = false;
        state.courseDetails = action.payload.data; // use payload directly
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.courseLoading = false;
        state.courseError = action.payload;
      });
  },
});

export const { clearCourseData } = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;
