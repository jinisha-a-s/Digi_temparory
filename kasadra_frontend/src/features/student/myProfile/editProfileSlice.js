import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateInstructorProfileAPI } from "../../../api/student/myProfile/editProfileAPI";

// Async thunk for updating profile
export const updateInstructorProfile = createAsyncThunk(
  "student/updateProfile",
  async ({ studentId, mappedData }, { rejectWithValue }) => {
    try {
      const response = await updateInstructorProfileAPI(studentId, mappedData);

      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);


const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    clearEditProfileState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateInstructorProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(updateInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearEditProfileState } = editProfileSlice.actions;
export default editProfileSlice.reducer;
