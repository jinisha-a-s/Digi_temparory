import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoursesAPI, enrollCourseAPI } from "../../../../api/student/myCourse/newCoursePurchase/newCoursePurchaseAPI";

// Fetch all courses
export const fetchStudentCourses = createAsyncThunk(
  "studentCourses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const courses = await getCoursesAPI(); // Already returns array
      return courses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Enroll in a course
export const enrollInCourse = createAsyncThunk(
  "studentCourses/enroll",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await enrollCourseAPI(courseId);
      return response; // could be { course_id, message }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const studentCoursesSlice = createSlice({
  name: "studentCourses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchStudentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = (action.payload || []).map((course) => ({
          ...course,
          thumbnail: course.thumbnail || "/images/default-thumbnail.jpg",
        }));
      })
      .addCase(fetchStudentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Enroll course
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Enrolled successfully!";
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = studentCoursesSlice.actions;
export default studentCoursesSlice.reducer;
