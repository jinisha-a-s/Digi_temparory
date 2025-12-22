// src/features/instructor/addCourse/lessonViewSlice.js
// ============================================================
// Redux slice for Lesson View Page (Instructor)
// Includes: Fetch, Update, Delete for PDFs, Weblinks, Quiz, Lab, Notes
// ============================================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    fetchLessonByIdAPI,
    updateLessonAPI,
    updatePdfAPI,
    updateWeblinkAPI,
    updateQuizAPI,
    updateLabAPI,
    updateNoteAPI, // ⭐ NEW

    deleteLessonAPI,
    deletePdfAPI,
    deleteWeblinkAPI,
    deleteQuizAPI,
    deleteLabAPI,
    deleteNoteAPI, // ⭐ NEW
} from "../../../api/instructor/addCourse/lessonViewAPI";

/* ============================================================
   FETCH LESSON BY ID
   ------------------------------------------------------------
   Command: Load lesson data and its contents into Redux state
============================================================ */
export const fetchLessonById = createAsyncThunk(
    "lessonView/fetchLessonById",
    async (lessonId, thunkAPI) => {
        try {
            return await fetchLessonByIdAPI(lessonId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ============================================================
   UPDATE LESSON (Name, Description)
   ------------------------------------------------------------
   Command: Update base lesson info
============================================================ */
export const updateLesson = createAsyncThunk(
    "lessonView/updateLesson",
    async ({ lessonId, data }, thunkAPI) => {
        try {
            return await updateLessonAPI(lessonId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ============================================================
   UPDATE CONTENTS
   ------------------------------------------------------------
   Command: Update PDFs / Weblinks / Quiz / Lab / Notes
============================================================ */
export const updatePdf = createAsyncThunk(
    "lessonView/updatePdf",
    async ({ pdfId, data }, thunkAPI) => {
        try {
            return await updatePdfAPI(pdfId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateWeblink = createAsyncThunk(
    "lessonView/updateWeblink",
    async ({ weblinkId, data }, thunkAPI) => {
        try {
            return await updateWeblinkAPI(weblinkId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateQuiz = createAsyncThunk(
    "lessonView/updateQuiz",
    async ({ quizId, data }, thunkAPI) => {
        try {
            return await updateQuizAPI(quizId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateLab = createAsyncThunk(
    "lessonView/updateLab",
    async ({ labId, data }, thunkAPI) => {
        try {
            return await updateLabAPI(labId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ⭐ NEW – UPDATE NOTE */
export const updateNote = createAsyncThunk(
    "lessonView/updateNote",
    async ({ noteId, data }, thunkAPI) => {
        try {
            return await updateNoteAPI(noteId, data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ============================================================
   DELETE CONTENTS
   ------------------------------------------------------------
   Command: Delete PDFs / Links / Quiz / Lab / Notes
============================================================ */
export const deleteLesson = createAsyncThunk(
    "lessonView/deleteLesson",
    async (lessonId, thunkAPI) => {
        try {
            return await deleteLessonAPI(lessonId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deletePdf = createAsyncThunk(
    "lessonView/deletePdf",
    async (pdfId, thunkAPI) => {
        try {
            return await deletePdfAPI(pdfId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteWeblink = createAsyncThunk(
    "lessonView/deleteWeblink",
    async (weblinkId, thunkAPI) => {
        try {
            return await deleteWeblinkAPI(weblinkId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteQuiz = createAsyncThunk(
    "lessonView/deleteQuiz",
    async (quizId, thunkAPI) => {
        try {
            return await deleteQuizAPI(quizId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteLab = createAsyncThunk(
    "lessonView/deleteLab",
    async (labId, thunkAPI) => {
        try {
            return await deleteLabAPI(labId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ⭐ NEW – DELETE NOTE */
export const deleteNote = createAsyncThunk(
    "lessonView/deleteNote",
    async (noteId, thunkAPI) => {
        try {
            return await deleteNoteAPI(noteId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

/* ============================================================
                   SLICE
   ------------------------------------------------------------
   Handles Loading, Error, Success & State Updates
============================================================ */
const lessonViewSlice = createSlice({
    name: "lessonView",
    initialState: {
        lesson: null,
        loading: false,
        error: null,
        success: null,
    },
    reducers: {
        /* Command: Clear messages */
        resetLessonViewState: (state) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {

        /* ============================================================
           FETCH LESSON
        ============================================================ */
        builder
            .addCase(fetchLessonById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLessonById.fulfilled, (state, action) => {
                state.loading = false;
                state.lesson = action.payload; // Store lesson data
            })
            .addCase(fetchLessonById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* ============================================================
           ALL UPDATE ACTIONS — Version Fixed & Optimized
        ============================================================ */

        /* UPDATE LESSON */
        builder
            .addCase(updateLesson.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Lesson updated successfully";
                state.lesson = { ...state.lesson, ...action.payload };
            })
            .addCase(updateLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* UPDATE PDF */
        builder
            .addCase(updatePdf.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updatePdf.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "PDF updated successfully";

                const updated = action.payload;
                const index = state.lesson.pdfs.findIndex(p => p.id === updated.id);
                if (index !== -1) state.lesson.pdfs[index] = updated;
            })
            .addCase(updatePdf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* UPDATE WEBLINK */
        builder
            .addCase(updateWeblink.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateWeblink.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Weblink updated successfully";

                const updated = action.payload;
                const index = state.lesson.weblinks.findIndex(w => w.id === updated.id);
                if (index !== -1) state.lesson.weblinks[index] = updated;
            })
            .addCase(updateWeblink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* UPDATE QUIZ */
        builder
            .addCase(updateQuiz.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Quiz updated successfully";

                const updated = action.payload;
                const index = state.lesson.quizzes.findIndex(q => q.id === updated.id);
                if (index !== -1) state.lesson.quizzes[index] = updated;
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* UPDATE LAB */
        builder
            .addCase(updateLab.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateLab.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Lab updated successfully";

                const updated = action.payload;
                const index = state.lesson.labs.findIndex(l => l.id === updated.id);
                if (index !== -1) state.lesson.labs[index] = updated;
            })
            .addCase(updateLab.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* UPDATE NOTE */
        builder
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.success = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Note updated successfully";

                const updated = action.payload;
                const index = state.lesson.notes.findIndex(n => n.id === updated.id);
                if (index !== -1) state.lesson.notes[index] = updated;
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* ============================================================
           ALL DELETE ACTIONS
        ============================================================ */
        builder
            .addCase(deleteLesson.fulfilled, (state) => {
                state.loading = false;
                state.success = "Deleted successfully";
                state.lesson = null;
            })

            /* DELETE PDF */
            .addCase(deletePdf.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.lesson.pdfs = state.lesson.pdfs.filter(p => p.id !== id);
                state.success = "Deleted successfully";
            })

            /* DELETE WEBLINK */
            .addCase(deleteWeblink.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.lesson.weblinks = state.lesson.weblinks.filter(w => w.id !== id);
                state.success = "Deleted successfully";
            })

            /* DELETE QUIZ */
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.lesson.quizzes = state.lesson.quizzes.filter(q => q.id !== id);
                state.success = "Deleted successfully";
            })

            /* DELETE LAB */
            .addCase(deleteLab.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.lesson.labs = state.lesson.labs.filter(l => l.id !== id);
                state.success = "Deleted successfully";
            })

            /* ⭐ DELETE NOTE */
            .addCase(deleteNote.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.lesson.notes = state.lesson.notes.filter(n => n.id !== id);
                state.success = "Deleted successfully";
            })

            /* Common rejected handlers */
            .addCase(deletePdf.rejected, (state, action) => { state.error = action.payload; })
            .addCase(deleteWeblink.rejected, (state, action) => { state.error = action.payload; })
            .addCase(deleteQuiz.rejected, (state, action) => { state.error = action.payload; })
            .addCase(deleteLab.rejected, (state, action) => { state.error = action.payload; })
            .addCase(deleteNote.rejected, (state, action) => { state.error = action.payload; });
    },
});

export const { resetLessonViewState } = lessonViewSlice.actions;
export default lessonViewSlice.reducer;
