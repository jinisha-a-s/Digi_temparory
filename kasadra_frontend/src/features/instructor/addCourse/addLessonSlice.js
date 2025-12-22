// src/features/instructor/addCourse/addLessonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLessonAPI } from "../../../api/instructor/addCourse/addLessonAPI.js";

// 🟢 Async thunk to call API
export const addLesson = createAsyncThunk(
  "instructor/addLesson",
  async (lessonData, { rejectWithValue }) => {
    try {
      const response = await addLessonAPI(lessonData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addLessonSlice = createSlice({
  name: "addLesson",
  initialState: {
    loading: false,
    success: false,
    error: null,
    lesson: null,
  },
  reducers: {
    resetLessonState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLesson.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lesson = action.payload; // this should have lesson.id
        state.error = null;
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add lesson";
      });
  },
});

export const { resetLessonState } = addLessonSlice.actions;
export default addLessonSlice.reducer;
