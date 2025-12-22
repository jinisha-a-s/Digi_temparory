import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCoursesForStudent } from "../../../../api/student/myCourse/existingCourse/myCoursePageAPI";

export const getCourses = createAsyncThunk(
  "myCourse/getCourses",
  async (studentId) => await fetchCoursesForStudent(studentId)
);

const myCourseSlice = createSlice({
  name: "myCourse",
  initialState: {
    purchased: [],
    recommended: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.purchased = action.payload.purchased || [];
        state.recommended = action.payload.recommended || [];
      })

      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default myCourseSlice.reducer;
