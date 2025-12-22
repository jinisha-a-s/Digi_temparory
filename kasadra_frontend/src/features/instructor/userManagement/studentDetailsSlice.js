// src/features/student/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentDetailsAPI } from "../../../api/instructor/userManagement/studentDetailsAPI.js";

// Thunk
export const fetchStudentDetails = createAsyncThunk(
  "student/fetchDetails",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await getStudentDetailsAPI(studentId);
      // If API returns an error object in "detail", reject it
      if (response.detail) {
        return rejectWithValue(response.detail.message || "Failed to fetch student");
      }
      return response; // valid student object
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail?.message || err.message || "Something went wrong");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.details = null;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; // guaranteed to be valid student object
        state.error = null;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.details = null;
        state.error = action.payload || "Failed to fetch student";
      });
  },
});

export default studentSlice.reducer;
