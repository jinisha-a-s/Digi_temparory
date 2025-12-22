// src/api/student/myCourse/newCoursePurchase/checkoutAPI.js
import api from "../../../axiosInstance.js";

/**
 * Fetch all cart items for a specific student
 * @param {number|string} studentId - Student ID
 * @returns {Promise<Object>} - Returns cart data
 */
export const getCartItemsAPI = async (studentId) => {
  try {
    const response = await api.get(`cart/view/${studentId}`, {
      headers: {
        "X-Role": "student",
      },
    });
    return response.data.data;// ✅ return only data
  } catch (err) {
    console.error("getCartItemsAPI error:", err);
    const message = err.response?.data?.message || err.message || "Failed to fetch cart items";
    throw err; // ✅ Let thunk handle the error
  }
};


// API to remove a course from the student's cart
export const removeCartItemAPI = async (studentId, courseId) => {
  try {
    const response = await api.delete(`cart/remove/${studentId}/${courseId}`, {
      headers: {
        "X-Role": "student",
      },
    });
    return response.data;// ✅ return only data
  } catch (err) {
    console.error("removeCartItemAPI error:", err);
    const message = err.response?.data?.message || err.message || "Failed to remove cart item";
    throw err; // ✅ Let thunk or caller handle the error
  }
};

export const buyCourseAPI = async (studentId, courseId) => {
  try {
    const response = await api.post(`/buy/${studentId}/${courseId}`, null, {
      headers: {
        "X-Role": "student", // if your backend requires role header
      },
    });

    return response.data; // returns full response { status, message, ... }
  } catch (err) {
    console.error("buyCourseAPI error:", err);
    const message = err.response?.data?.message || err.message || "Failed to purchase course";
    throw new Error(message);
  }
};