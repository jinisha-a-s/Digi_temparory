import api from "../../axiosInstance.js";

/**
 * Fetch all batches for a course
 * @param {number|string} courseId - ID of the selected course
 * @returns {Promise<Array>} - Array of batches
 */


// -----------------------------------------------
// We are Fetching courses name from another slice
// -----------------------------------------------

// ----------------------
// GET Batches by Course
// ----------------------
export const getBatchesAPI = async (courseId) => {
    try {
        const response = await api.get(`batches/by-course/${courseId}`, {
            headers: {
                "X-Role": "instructor",
            },
        });
        return response.data;
    } catch (err) {
        console.error("getBatchesAPI error:", err);
        const message = err.response?.data?.message || err.message || "Failed to fetch batches";
        throw new Error(message);
    }
};

// ----------------------
// GET Students by Course
// ----------------------
export const getStudentsByCourseAPI = async (courseId) => {
    try {
        const response = await api.get(`/buy/course/${courseId}/students`, {
            headers: { "X-Role": "instructor" },
        });

        return response.data;
    } catch (err) {
        console.error("getStudentsByCourseAPI error:", err);
        const message = err.response?.data?.message || err.message || "Failed to fetch students";
        throw new Error(message);
    }
};


