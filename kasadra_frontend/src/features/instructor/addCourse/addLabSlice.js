import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLabAPI } from "../../../api/instructor/addCourse/addLabAPI";

export const addLab = createAsyncThunk(
  "addLab/submit",
  async (labData, { rejectWithValue }) => {
    try {
      const response = await addLabAPI(labData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add lab");
    }
  }
);

const addLabSlice = createSlice({
  name: "addLab",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetLabState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addLab.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addLab.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addLab.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetLabState } = addLabSlice.actions;
export default addLabSlice.reducer;
