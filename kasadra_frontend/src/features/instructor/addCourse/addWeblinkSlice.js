import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadWeblinkAPI } from "../../../api/instructor/addCourse/addWeblinkAPI";

// Async Thunk
export const uploadWeblink = createAsyncThunk(
    "weblink/uploadWeblink",
    async (linkData, { rejectWithValue }) => {
        try {
            const response = await uploadWeblinkAPI(linkData);
            return response;
        } catch (error) {
            return rejectWithValue(
                error?.message || error?.error || "Failed to upload weblink"
            );
        }
    }
);

const addWeblinkSlice = createSlice({
    name: "weblink",
    initialState: {
        loading: false,
        success: false,
        error: false,
        successMessage: "",
        errorMessage: "",
    },
    reducers: {
        resetWeblinkState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadWeblink.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })
            .addCase(uploadWeblink.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.successMessage =
                    action.payload?.message || "Weblink uploaded successfully!";
            })
            .addCase(uploadWeblink.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage =
                    action.payload || "Failed to upload weblink.";
            });
    },
});

export const { resetWeblinkState } = addWeblinkSlice.actions;
export default addWeblinkSlice.reducer;
