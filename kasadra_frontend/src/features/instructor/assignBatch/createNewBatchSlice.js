import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCoursesAPI, createBatchAPI } from "../../../api/instructor/assignBatch/createNewBatchAPI";

// --------------------
// Async thunks
// --------------------

// Fetch all courses
export const fetchCourses = createAsyncThunk(
  "newBatch/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const courses = await getAllCoursesAPI();
      return courses; // array of courses from API
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to fetch courses");
    }
  }
);

// Create new batch
export const createBatch = createAsyncThunk(
  "newBatch/createBatch",
  async (batchData, thunkAPI) => {
    try {
      const response = await createBatchAPI(batchData);
      return response; // created batch object from API
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Failed to create batch");
    }
  }
);

// --------------------
// Slice
// --------------------
const newBatchSlice = createSlice({
  name: "newBatch",
  initialState: {
    courses: [],
    batch: null,    // latest created batch
    loading: false, // shared loading for fetch/create
    error: null,
    success: false, // success flag for creation
  },
  reducers: {
    resetBatchState: (state) => {
      state.batch = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // --------------------
    // fetchCourses
    // --------------------
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --------------------
    // createBatch
    // --------------------
    builder
      .addCase(createBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batch = action.payload;
        state.success = true;
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetBatchState } = newBatchSlice.actions;
export default newBatchSlice.reducer;
