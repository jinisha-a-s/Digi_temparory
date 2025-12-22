


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addConceptAPI } from "../../../api/instructor/addCourse/addConceptAPI";
 
/**
 * Async thunk to add a concept
 * Returns the concept object including concept_id
 */
export const addConcept = createAsyncThunk(
  "concept/addConcept",
  async (conceptData, { rejectWithValue }) => {
    try {
      const response = await addConceptAPI(conceptData);
      // backend response = { status, message, data: { concept_id, ... } }
      return response.data.data; // ✅ store only the "data" object
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

const conceptSlice = createSlice({
  name: "concept",
  initialState: {
    concepts: [],             // all added concepts
    lastAddedConceptId: null, // ✅ store the last added concept ID for Lesson/Quiz linking
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    resetConcepts: (state) => {
      state.concepts = [];
      state.lastAddedConceptId = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addConcept.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addConcept.fulfilled, (state, action) => {
        state.loading = false;
        state.concepts.push(action.payload);                       // ✅ add concept
        state.lastAddedConceptId = action.payload.concept_id;      // ✅ store ID
        state.success = "Concept added successfully...";
      })
      .addCase(addConcept.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { clearMessages, resetConcepts } = conceptSlice.actions;
export default conceptSlice.reducer;
 

