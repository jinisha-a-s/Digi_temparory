  


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNoteAPI } from "../../../api/instructor/addCourse/notePadAPI";

// Async thunk for creating a note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await createNoteAPI(noteData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || " Failed to save note.");
    }
  }
);

export const resetNoteState = () => (dispatch) => {
  dispatch({ type: "notes/reset" });
};

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    success: false,
    error: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.success = true;
        state.successMessage = " Note saved successfully!";
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload || " Failed to save note.";
      });
  },
});

export const { reset } = notesSlice.actions;

export default notesSlice.reducer;

