// src/features/student/myCourse/newCoursePurchase/checkoutSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItemsAPI, removeCartItemAPI, buyCourseAPI } from "../../../../api/student/myCourse/newCoursePurchase/checkOutAPI";

// 1️⃣ Fetch cart items
export const fetchCartItems = createAsyncThunk(
    "checkout/fetchCartItems",
    async (studentId, { rejectWithValue }) => {
        try {
            const cartArray = await getCartItemsAPI(studentId); // ✅ already returns array
            return cartArray; // <-- This returns the array to the slice
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
        }
    }
);


export const removeCartItem = createAsyncThunk(
    "checkout/removeCartItem",
    async ({ studentId, courseId }, { rejectWithValue }) => {
        try {
            const response = await removeCartItemAPI(studentId, courseId);
            // just return courseId for frontend update
            return { courseId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove course");
        }
    }
);



// 3️⃣ Checkout
export const purchaseCourse = createAsyncThunk(
    "checkout/purchaseCourse",
    async ({ studentId, courseId }, { rejectWithValue }) => {
        try {
            const data = await buyCourseAPI(studentId, courseId);
            return data; // { status, message }
        } catch (error) {
            return rejectWithValue(error.message || "Purchase failed");
        }
    }
);


// 🧩 Slice
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
        checkoutSuccess: false,
    },
    reducers: {
        clearCheckoutState: (state) => {
            state.cartItems = [];
            state.error = null;
            state.checkoutSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchCartItems
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = Array.isArray(action.payload) ? action.payload : [];
            })

            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // removeCartItem
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.courseId && item.course_id !== action.payload.courseId
                );
            })


            .addCase(purchaseCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(purchaseCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.checkoutSuccess = true;
                // Optionally, remove the purchased course from cart
                // state.cartItems = state.cartItems.filter(item => item.id !== purchasedCourseId);
            })
            .addCase(purchaseCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { clearCheckoutState } = checkoutSlice.actions;
export default checkoutSlice.reducer;
