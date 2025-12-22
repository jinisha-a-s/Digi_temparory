// src/features/student/zoomLinkPageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudentZoomLinkAPI } from "../../../../api/student/myCourse/existingCourse/zoomLinkPageAPI";

export const fetchZoomLink = createAsyncThunk(
  "zoomLink/fetch",
  async ({ studentId, courseId }, { rejectWithValue }) => {
    try {
      return await fetchStudentZoomLinkAPI(studentId, courseId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const zoomLinkSlice = createSlice({
  name: "zoomLink",
  initialState: {
    loading: false,
    meeting: null,
    error: null,
  },
  reducers: {
    resetZoomPage: (state) => {
      state.loading = false;
      state.meeting = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoomLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZoomLink.fulfilled, (state, action) => {
        state.loading = false;
        state.meeting = action.payload;
      })
      .addCase(fetchZoomLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed fetching meeting link";
      });
  },
});

export const { resetZoomPage } = zoomLinkSlice.actions;
export default zoomLinkSlice.reducer;
