import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadPDFAPI } from "../../../api/instructor/addCourse/addPDFApi";
 
// ------------------------ THUNK ------------------------
export const uploadPDF = createAsyncThunk(
  "pdf/uploadPDF",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadPDFAPI(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.message || "❌ Failed to upload PDF. Please try again."
      );
    }
  }
);
 
const initialState = {
  loading: false,
  success: false,
  error: false,
  successMessage: "",
  errorMessage: "",
};
 
// ------------------------ SLICE ------------------------
const addPDFSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    resetPDFState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(uploadPDF.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload?.message || "✅ PDF uploaded successfully!";
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage =
          action.payload || "❌ Failed to upload PDF. Try again.";
      });
  },
});
 
export const { resetPDFState } = addPDFSlice.actions;
export default addPDFSlice.reducer;