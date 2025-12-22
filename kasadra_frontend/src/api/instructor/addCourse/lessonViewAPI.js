// src/api/instructor/addCourse/lessonViewAPI.js
import api from "../../axiosInstance.js";

/* -------------------------------------------------------------
   COMMAND: Common error extractor
   PURPOSE: Reuse same error message formatting everywhere.
------------------------------------------------------------- */
const extractError = (err, fallback) => {
    return (
        err.response?.data?.detail ||
        err.response?.data?.message ||
        fallback
    );
};

/* -------------------------------------------------------------
   COMMAND: Fetch a single lesson by ID
   ENDPOINT: GET /lessons:lessonId
------------------------------------------------------------- */
export const fetchLessonByIdAPI = async (lessonId) => {
    try {
        const response = await api.get(`/lessons${lessonId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to fetch lesson"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update Lesson
   ENDPOINT: PUT /lessons/:lessonId
------------------------------------------------------------- */
export const updateLessonAPI = async (lessonId, data) => {
    try {
        const response = await api.put(`/lessons/${lessonId}`, data, {
            headers: { "X-Role": "instructor" },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update lesson"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update PDF
   ENDPOINT: PUT contents/update/pdf/:pdfId
------------------------------------------------------------- */
export const updatePdfAPI = async (pdfId, data) => {
    try {
        const response = await api.put(`contents/update/pdf/${pdfId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Role": "instructor",
            },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update PDF"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update Weblink
   ENDPOINT: PUT contents/update/weblink/:weblinkId
------------------------------------------------------------- */
export const updateWeblinkAPI = async (weblinkId, data) => {
    try {
        const response = await api.put(`contents/update/weblink/${weblinkId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Role": "instructor",
            },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update weblink"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update Note
   ENDPOINT: PUT /courses/notes/:noteId
------------------------------------------------------------- */
export const updateNoteAPI = async (noteId, data) => {
    try {
        const response = await api.put(`/courses/notes/${noteId}`, data, {
            headers: { "X-Role": "instructor" },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update note"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update Quiz
   ENDPOINT: PUT contents/update/quiz/:quizId
------------------------------------------------------------- */
export const updateQuizAPI = async (quizId, data) => {
    try {
        const response = await api.put(`contents/update/quiz/${quizId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Role": "instructor",
            },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update quiz"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Update Lab
   ENDPOINT: PUT /contents/update/lab/:labId
------------------------------------------------------------- */
export const updateLabAPI = async (labId, data) => {
    try {
        const response = await api.put(`/contents/update/lab/${labId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-Role": "instructor",
            },
        });
        return response.data.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to update lab"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete Lesson
   ENDPOINT: DELETE lessons/delete/:lessonId
------------------------------------------------------------- */
export const deleteLessonAPI = async (lessonId) => {
    try {
        const response = await api.delete(`/lessons/delete/${lessonId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete lesson"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete PDF
   ENDPOINT: DELETE /contents/delete/pdf/:pdfId
------------------------------------------------------------- */
export const deletePdfAPI = async (pdfId) => {
    try {
        const response = await api.delete(`/contents/delete/pdf/${pdfId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete PDF"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete Weblink
   ENDPOINT: DELETE /contents/delete/weblink/:weblinkId
------------------------------------------------------------- */
export const deleteWeblinkAPI = async (weblinkId) => {
    try {
        const response = await api.delete(`/contents/delete/weblink/${weblinkId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete weblink"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete Note
   ENDPOINT: DELETE /courses/notes/:noteId
------------------------------------------------------------- */
export const deleteNoteAPI = async (noteId) => {
    try {
        const response = await api.delete(`/courses/notes/${noteId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete note"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete Quiz
   ENDPOINT: DELETE /contents/delete/quiz/:quizId
------------------------------------------------------------- */
export const deleteQuizAPI = async (quizId) => {
    try {
        const response = await api.delete(`/contents/delete/quiz/${quizId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete quiz"));
    }
};

/* -------------------------------------------------------------
   COMMAND: Delete Lab
   ENDPOINT: DELETE /contents/delete/lab/:labId
------------------------------------------------------------- */
export const deleteLabAPI = async (labId) => {
    try {
        const response = await api.delete(`/contents/delete/lab/${labId}`, {
            headers: { "X-Role": "instructor" },
        });
        return response.data;
    } catch (err) {
        throw new Error(extractError(err, "Failed to delete lab"));
    }
};
