// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getLessonsAPI, addScheduleClassAPI } from "../../../api/instructor/addCourse/scheduleClassAPI.js";

// // ✅ Fetch lessons for a course
// export const fetchLessons = createAsyncThunk(
//   "schedule/fetchLessons",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       const data = await getLessonsAPI(courseId); // returns [{id, title}]
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to fetch lessons");
//     }
//   }
// );

// // ✅ Add a scheduled class
// export const addScheduleClass = createAsyncThunk(
//   "schedule/addScheduleClass",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const data = await addScheduleClassAPI(payload);
//       // return response?.message || "Class scheduled successfully!";
//       return data; // return API response
//     } catch (error) {
//       return rejectWithValue(error.message || "Failed to schedule class");
//     }
//   }
// );

// const scheduleSlice = createSlice({
//   name: "schedule",
//   initialState: {
//     lessons: [],           // only lesson names and ids
//     lessonsLoading: false,
//     lessonsError: null,
//     addLoading: false,
//     addSuccess: null,
//     addError: null,
//   },
//   reducers: {
//     clearAddMessages: (state) => {
//       state.addSuccess = null;
//       state.addError = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch lessons
//       .addCase(fetchLessons.pending, (state) => {
//         state.lessonsLoading = true;
//         state.lessonsError = null;
//         state.lessons = [];
//       })
//       .addCase(fetchLessons.fulfilled, (state, action) => {
//         state.lessonsLoading = false;
//         state.lessons = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchLessons.rejected, (state, action) => {
//         state.lessonsLoading = false;
//         state.lessonsError = action.payload;
//         state.lessons = [];
//       })

//       // Add scheduled class
//       .addCase(addScheduleClass.pending, (state) => {
//         state.addLoading = true;
//         state.addSuccess = null;
//         state.addError = null;
//       })
//       .addCase(addScheduleClass.fulfilled, (state, action) => {
//         state.addLoading = false;
//         state.addSuccess = "Class scheduled successfully!";
//       })
//       .addCase(addScheduleClass.rejected, (state, action) => {
//         state.addLoading = false;
//         state.addError = action.payload;
//       });
//   },
// });

// export const { clearAddMessages } = scheduleSlice.actions;
// export default scheduleSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLessonsAPI,
  getBatchesAPI,
  addScheduleClassAPI,
} from "../../../api/instructor/addCourse/scheduleClassAPI.js";

// ✅ Fetch lessons
export const fetchLessons = createAsyncThunk(
  "schedule/fetchLessons",
  async (courseId, { rejectWithValue }) => {
    try {
      const data = await getLessonsAPI(courseId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch lessons");
    }
  }
);

// ✅ Fetch batches
export const fetchBatches = createAsyncThunk(
  "schedule/fetchBatches",
  async (courseId, { rejectWithValue }) => {
    try {
      const data = await getBatchesAPI(courseId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch batches");
    }
  }
);

// ✅ Add schedule class
export const addScheduleClass = createAsyncThunk(
  "schedule/addScheduleClass",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addScheduleClassAPI(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to schedule class");
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    lessons: [],
    batches: [],
    lessonsLoading: false,
    batchesLoading: false,
    lessonsError: null,
    batchesError: null,
    addLoading: false,
    addSuccess: null,
    addError: null,
  },
  reducers: {
    clearAddMessages: (state) => {
      state.addSuccess = null;
      state.addError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Lessons
      .addCase(fetchLessons.pending, (state) => {
        state.lessonsLoading = true;
        state.lessonsError = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessonsLoading = false;
        state.lessons = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.lessonsLoading = false;
        state.lessonsError = action.payload;
        state.lessons = [];
      })

      // ✅ Batches
      .addCase(fetchBatches.pending, (state) => {
        state.batchesLoading = true;
        state.batchesError = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.batchesLoading = false;
        state.batches = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.batchesLoading = false;
        state.batchesError = action.payload;
        state.batches = [];
      })

      // ✅ Add schedule
      .addCase(addScheduleClass.pending, (state) => {
        state.addLoading = true;
        state.addSuccess = null;
        state.addError = null;
      })
      .addCase(addScheduleClass.fulfilled, (state) => {
        state.addLoading = false;
        state.addSuccess = "Class scheduled successfully!";
      })
      .addCase(addScheduleClass.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      });
  },
});

export const { clearAddMessages } = scheduleSlice.actions;
export default scheduleSlice.reducer;
