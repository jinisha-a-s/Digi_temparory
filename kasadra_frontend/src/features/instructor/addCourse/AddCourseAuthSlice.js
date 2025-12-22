import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstructorCoursesAPI, addCourseAPI } from "../../../api/instructor/addCourse/AddcourseAuth";

// Fetch courses
export const fetchInstructorCourses = createAsyncThunk(
  "course/fetchInstructorCourses",
  async (_, thunkAPI) => {
    try {
      const response = await getInstructorCoursesAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add new course
export const addNewCourse = createAsyncThunk(
  "course/addNewCourse",
  async (formData, thunkAPI) => {
    try {
      const response = await addCourseAPI(formData);
      return response; // Return the newly created course
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewCourse.fulfilled, (state, action) => {
        // ✅ Push the new course directly into state.courses
        state.courses.push(action.payload);
      })
      .addCase(addNewCourse.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
