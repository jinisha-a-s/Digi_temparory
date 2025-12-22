import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfileAPI } from "../../../api/student/myProfile/myProfileAPI";

// Async thunk to fetch student by ID
export const fetchUserProfile = createAsyncThunk(
    "myProfile/fetchUserProfile",
    async (studentId, { rejectWithValue }) => {
        try {
            const data = await fetchUserProfileAPI(studentId);
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const myProfileSlice = createSlice({
    name: "myProfile",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearMyProfileState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // name, email, phone_no
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch profile";
            });
    },
});

export const { clearMyProfileState } = myProfileSlice.actions;
export default myProfileSlice.reducer;
