import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLessonsAPI,
  deleteLessonAPI,
} from "../../../api/instructor/addCourse/addContentAPI";

/* ============================= */
/* Fetch lessons by COURSE */
/* ============================= */

export const fetchLessons = createAsyncThunk(
  "addContent/fetchLessons",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getLessonsAPI(courseId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ============================= */
/* Delete lesson */
/* ============================= */

export const deleteLesson = createAsyncThunk(
  "addContent/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      return await deleteLessonAPI(lessonId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addContentSlice = createSlice({
  name: "addContent",
  initialState: {
    lessons: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearContentState: (state) => {
      state.lessons = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })

      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter(
          (lesson) => lesson.lesson_id !== action.meta.arg
        );
      });
  },
});

export const { clearContentState } = addContentSlice.actions;
export default addContentSlice.reducer;
