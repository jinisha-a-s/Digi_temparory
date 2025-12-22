import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBatchesAPI, getStudentsByCourseAPI } from "../../../api/instructor/assignBatch/assignBatchAPI.js";

// Async thunk to fetch batches for a course
export const fetchBatches = createAsyncThunk(
    "batches/fetchBatches",
    async (courseId, thunkAPI) => {
        try {
            const data = await getBatchesAPI(courseId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const moveStudentsToBatch = createAsyncThunk(
    "batches/moveStudentsToBatch",
    async ({ studentIds, batchId }, thunkAPI) => {
        try {
            const data = await moveStudentsAPI(studentIds, batchId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



// Fetch students who purchased a course
export const fetchStudentsByCourse = createAsyncThunk(
    "batches/fetchStudentsByCourse",
    async (courseId, thunkAPI) => {
        try {
            const data = await getStudentsByCourseAPI(courseId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const batchesSlice = createSlice({
    name: "batches",
    initialState: {
        selectedCourseId: null,
        students: [],
        batches: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearBatches: (state) => {
            state.batches = [];
            state.students = [];
            state.error = null;
            state.loading = false;
        },
        setSelectedCourse(state, action) {
            state.selectedCourseId = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBatches.fulfilled, (state, action) => {
                state.loading = false;
                state.batches = action.payload.data || [];
            })
            .addCase(fetchBatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Students
            .addCase(fetchStudentsByCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentsByCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload.students || [];
                // ⭐ matches your backend
            })
            .addCase(fetchStudentsByCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Move Students to Batch
            .addCase(moveStudentsToBatch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveStudentsToBatch.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(moveStudentsToBatch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    },
});

export const { clearBatches, setSelectedCourse  } = batchesSlice.actions;
export default batchesSlice.reducer;
