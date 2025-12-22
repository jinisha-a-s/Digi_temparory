// src/features/auth/authSlice.js


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerStudentAPI, loginStudentAPI } from "../../api/auth/auth.js";

export const registerStudent = createAsyncThunk(
  "auth/registerStudent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerStudentAPI(formData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginStudent = createAsyncThunk(
  "auth/loginStudent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await loginStudentAPI(formData);

      // ✅ Save to localStorage
      localStorage.setItem("studentToken", response.token);
      localStorage.setItem("studentId", response.id);
      localStorage.setItem("studentName", response.studentName);

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ---------- Initial State ----------
const initialState = {
  user: localStorage.getItem("studentId")
    ? {
        id: localStorage.getItem("studentId"),
        name: localStorage.getItem("studentName"),
      }
    : null,
  token: localStorage.getItem("studentToken") || null,
  isAuthenticated: !!localStorage.getItem("studentToken"),
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("studentToken") || null,
    isAuthenticated: !!localStorage.getItem("studentToken"),
    role: "student",
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;

      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
    },
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // LOGIN
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { id: action.payload.id, name: action.payload.studentName };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
