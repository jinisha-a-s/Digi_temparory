import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addQuizAPI } from "../../../api/instructor/addCourse/addQuizAPI";

export const addQuiz = createAsyncThunk(
  "quiz/addQuiz",
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await addQuizAPI(quizData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add quiz");
    }
  }
);

const addQuizSlice = createSlice({
  name: "addQuiz",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetQuizState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addQuiz.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addQuiz.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizState } = addQuizSlice.actions;
export default addQuizSlice.reducer;
