import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCourseDetailsAPI,
  addToCartAPI,
} from "../../../../api/student/myCourse/newCoursePurchase/courseOverviewAPI";

const initialState = {
  course: null,
  loading: false,
  error: null,
  addingToCart: false,
  addCartSuccess: false,
};

// Fetch course details
export const fetchCourseDetails = createAsyncThunk(
  "courseOverview/fetchCourseDetails",
  async (courseId, { rejectWithValue }) => {
    try {
      return await fetchCourseDetailsAPI(courseId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add course to cart
export const addToCart = createAsyncThunk(
  "courseOverview/addToCart",
  async ({ studentId, courseId }, { rejectWithValue }) => {
    try {
      const res = await addToCartAPI(studentId, courseId);
      return res.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const courseOverviewSlice = createSlice({
  name: "courseOverview",
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.course = null;
      state.loading = false;
      state.error = null;
      state.addingToCart = false;
      state.addCartSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch course
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true;
        state.addCartSuccess = false;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.addingToCart = false;
        state.addCartSuccess = true;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addingToCart = false;
        state.addCartSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { clearCourse } = courseOverviewSlice.actions;
export default courseOverviewSlice.reducer;
