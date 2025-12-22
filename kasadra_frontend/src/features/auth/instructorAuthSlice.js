// src/features/auth/instructorAuthSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerInstructorAPI, loginInstructorAPI } from "../../api/auth/auth.js";

// Register Instructor thunk
export const registerInstructor = createAsyncThunk(
  "instructorAuth/registerInstructor",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerInstructorAPI(formData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message); // always string
    }
  }
);

// Login Instructor thunk
export const loginInstructor = createAsyncThunk(
  "instructorAuth/loginInstructor",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await loginInstructorAPI(formData);

      // Save to localStorage
      localStorage.setItem("instructorToken", response.token);
      localStorage.setItem("instructorId", response.id);
      localStorage.setItem("instructorName", response.instructorName);

      return response;
    } catch (err) {
      return rejectWithValue(err.message); // always string
    }
  }
);

const instructorAuthSlice = createSlice({
  name: "instructorAuth",
  initialState: {
    user: null,
    token: localStorage.getItem("instructorToken") || null,
    isAuthenticated: !!localStorage.getItem("instructorToken"),
    role: "instructor",
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    instructorLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;

      localStorage.removeItem("instructorToken");
      localStorage.removeItem("instructorId");
      localStorage.removeItem("instructorName");
    },
    clearInstructorRegistrationState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // always string
        state.success = false;
      })

      // Login
      .addCase(loginInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.instructorName,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(loginInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // always string
        state.success = false;
      });
  },
});

export const { instructorLogout, clearInstructorRegistrationState } = instructorAuthSlice.actions;
export default instructorAuthSlice.reducer;
