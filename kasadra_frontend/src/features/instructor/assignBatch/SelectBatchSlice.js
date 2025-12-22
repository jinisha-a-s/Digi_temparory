// features/instructor/assignBatch/assignBatchSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    assignStudentsToBatchAPI, moveStudentsAPI
} from "../../../api/instructor/assignBatch/SelectBatchAPI.js";

// -----------------------------
// Thunks
// -----------------------------
export const assignStudentsToBatch = createAsyncThunk(
    "assignBatch/assignStudentsToBatch",
    async ({ batchId, course_id, studentIds }, { rejectWithValue }) => {
        try {
            return await assignStudentsToBatchAPI({ batchId, course_id, studentIds });
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                err.message
            );
        }
    }
);


export const moveStudents = createAsyncThunk(
    "assignBatch/moveStudents",
    async ({ batchId, course_id, studentIds }, { rejectWithValue }) => {
        try {
            return await moveStudentsAPI(studentIds, course_id, batchId);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);



// -----------------------------
// Slice
// -----------------------------
const assignBatchSlice = createSlice({
    name: "assignBatch",
    initialState: {
        loading: false,
        error: null,
        assignSuccess: false,
        successMessage: null,
    },

    reducers: {
        clearBatches(state) {
            state.batches = [];
            state.error = null;
            state.successMessage = null;
        },
        resetAssignStatus(state) {
            state.assignSuccess = false;
        }
    },

    extraReducers: (builder) => {
        builder

            // --- assignStudentsToBatch ---
            .addCase(assignStudentsToBatch.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.assignSuccess = false;
            })
            .addCase(assignStudentsToBatch.fulfilled, (state, action) => {
                state.loading = false;
                state.assignSuccess = true;
                state.successMessage = action.payload?.message || "Students assigned successfully!";
            })
            .addCase(assignStudentsToBatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;   // <-- this stores "Batch full..." 
            })

            .addCase(moveStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.assignSuccess = true;
                state.successMessage = action.payload?.message || "Students moved successfully!";
            })
            .addCase(moveStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    }
});

export const { clearBatches, resetAssignStatus } = assignBatchSlice.actions;
export default assignBatchSlice.reducer;
