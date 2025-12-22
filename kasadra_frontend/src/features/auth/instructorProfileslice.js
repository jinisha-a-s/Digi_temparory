import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInstructorProfileAPI } from '../../api/auth/auth.js';

// Get Profile of logged-in instructor
export const fetchInstructorProfile = createAsyncThunk(
  "instructorProfile/fetchInstructorProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getInstructorProfileAPI(); // API returns all instructors
      const instructorId = parseInt(localStorage.getItem("instructorId"));

      if (!instructorId) {
        return thunkAPI.rejectWithValue("No instructorId in localStorage");
      }

      // Find the logged-in instructor
      const loggedInInstructor = response.detail.data.find(
        (inst) => inst.id === instructorId
      );

      return loggedInInstructor; // ✅ Only the logged-in instructor
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch profile");
    }
  }
);

const instructorProfileSlice = createSlice({
  name: "instructorProfile",
  initialState: {
    user: null,
    profile: null,
    token: localStorage.getItem("instructorToken") || null,
    isAuthenticated: !!localStorage.getItem("instructorToken"),
    loading: false,
    error: null,
  },
  reducers: {
    instructorLogout: (state) => {
      state.user = null;
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("instructorToken");
      localStorage.removeItem("instructorId");
      localStorage.removeItem("instructorName");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // ✅ Logged-in instructor
      })
      .addCase(fetchInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { instructorLogout } = instructorProfileSlice.actions;
export default instructorProfileSlice.reducer;
