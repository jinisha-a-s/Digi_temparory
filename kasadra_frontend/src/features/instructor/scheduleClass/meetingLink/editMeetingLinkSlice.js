import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMeetingLinkById,
  updateMeetingLinkById,
} from "../../../../api/instructor/scheduleClass/meetingLink/editMeetingLinkAPI";

// Fetch single meeting link
export const fetchMeetingLink = createAsyncThunk(
  "editMeetingLink/fetch",
  async ({ meetingId, instructorId }, { rejectWithValue }) => {
    try {
      return await getMeetingLinkById(meetingId, instructorId);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch meeting link");
    }
  }
);

// Update meeting link
export const editMeetingLink = createAsyncThunk(
  "editMeetingLink/update",
  async ({ meetingId, updatedData }, { rejectWithValue }) => {
    try {
      return await updateMeetingLinkById(meetingId, updatedData);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update meeting link");
    }
  }
);

const initialState = {
  meetingLink: null,
  status: "idle",
  error: null,
  success: false,
};

const editMeetingLinkSlice = createSlice({
  name: "editMeetingLink",
  initialState,
  reducers: {
    resetState: (state) => {
      state.meetingLink = null;
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch meeting link
      .addCase(fetchMeetingLink.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMeetingLink.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meetingLink = action.payload.data; // now includes course_id & batch_id
      })
      .addCase(fetchMeetingLink.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update meeting link
      .addCase(editMeetingLink.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(editMeetingLink.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meetingLink = action.payload.data;
        state.success = true;
      })
      .addCase(editMeetingLink.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetState } = editMeetingLinkSlice.actions;
export default editMeetingLinkSlice.reducer;
