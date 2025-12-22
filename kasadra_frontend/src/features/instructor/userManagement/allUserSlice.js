import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStudentsAPI } from "../../../api/instructor/userManagement/user.js";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getAllStudentsAPI();
      return response; // array of users
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch users");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // ✅ prepared for future pagination
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = [...action.payload];
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
