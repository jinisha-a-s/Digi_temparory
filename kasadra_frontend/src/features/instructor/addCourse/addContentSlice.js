import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLessonsAPI,
  deleteLessonAPI,
  activateLessonAPI,
  getBatchesAPI,
} from "../../../api/instructor/addCourse/addContentAPI";

// Fetch lessons by batch
export const fetchLessons = createAsyncThunk(
  "addContent/fetchLessons",
  async (batchId, { rejectWithValue }) => {
    try {
      return await getLessonsAPI(batchId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch batches for a course
export const fetchBatches = createAsyncThunk(
  "addContent/fetchBatches",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getBatchesAPI(courseId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete lesson
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

// Activate or deactivate lesson
export const activateLesson = createAsyncThunk(
  "addContent/activateLesson",
  async ({ lessonId, batchId }, { rejectWithValue }) => {
    try {
      return await activateLessonAPI(lessonId, batchId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addContentSlice = createSlice({
  name: "addContent",
  initialState: {
    lessons: [],
    batches: [],
    loading: false,
    error: null,
  },

  // ⭐ RESET STATE WHEN COURSE CHANGES
  reducers: {
    clearContentState: (state) => {
      state.lessons = [];
      state.batches = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.batches = action.payload;
      })

      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter(
          (l) => l.lesson_id !== action.payload.lesson_id
        );
      })

      .addCase(activateLesson.fulfilled, (state) => {});
  },
});

export const { clearContentState } = addContentSlice.actions;
export default addContentSlice.reducer;
