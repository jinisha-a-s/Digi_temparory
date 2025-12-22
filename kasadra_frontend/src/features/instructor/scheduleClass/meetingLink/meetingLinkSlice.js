import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMeetingLinksByInstructor,
  deleteMeetingLinkById,
} from "../../../../api/instructor/scheduleClass/meetingLink/meetingLinkAPI";

export const fetchMeetingLinks = createAsyncThunk(
  "meetingLink/fetchAll",
  async (instructorId, { rejectWithValue }) => {
    try {
      const data = await getMeetingLinksByInstructor(instructorId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Delete meeting link thunk
export const deleteMeetingLink = createAsyncThunk(
  "meetingLink/delete",
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await deleteMeetingLinkById(meetingId);
      return response.deleted_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const meetingLinkSlice = createSlice({
  name: "meetingLink",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingLinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeetingLinks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMeetingLinks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteMeetingLink.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteMeetingLink.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default meetingLinkSlice.reducer;
