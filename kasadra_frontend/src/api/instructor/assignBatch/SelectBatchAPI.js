
import api from "../../axiosInstance.js";
// ---------------------------------------
// ASSIGN Students to Batch  (POST)
// ---------------------------------------
export const assignStudentsToBatchAPI = async ({ batchId, course_id, studentIds }) => {
    try {
        const response = await api.post(
            "/batches/assign",
            {
                batch_id: batchId,
                course_id: course_id,
                student_ids: studentIds
            },
            { headers: { "X-Role": "instructor" } }
        );

        return response.data;
    } catch (err) {
        const message =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            err.message;

        return Promise.reject({
            response: { data: { detail: message } }
        });
    }
};


// ----------------------
// MOVE Students to Batch
// ----------------------

export const moveStudentsAPI = async (studentIds, course_id, batchId) => {
    try {
        const response = await api.put(
            "/batches/update",
            {
                student_ids: studentIds,
                course_id: course_id,
                batch_id: batchId
            },
            { headers: { "X-Role": "instructor" } }
        );

        return response.data;
    } catch (err) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Failed to move students";

        throw new Error(message);
    }
};


