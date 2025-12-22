import React, { useEffect } from "react";
import "../../../../styles/student/myCourse/newCoursePurchase/CheckOut.css";
import Studentnavbar from "../../../../components/Studentnavbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchCartItems,
    removeCartItem,
    purchaseCourse,
    clearCheckoutState,
} from "../../../../features/student/myCourse/newCoursePurchase/checkOutSlice.js";
import BackButton from "../../../../components/BackButton.jsx";

const CheckOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const studentId = localStorage.getItem("studentId");

    const { cartItems = [], loading, error, checkoutSuccess, checkoutLoading } = useSelector(
        (state) => state.checkOut
    );

    // Fetch cart items on mount
    useEffect(() => {
        if (studentId) {
            dispatch(fetchCartItems(studentId));
        }
    }, [dispatch, studentId]);

    // Remove course with confirmation
    const handleRemove = (courseId) => {
        dispatch(removeCartItem({ studentId, courseId }));

        // if (window.confirm("Are you sure you want to remove this course?")) {
        //     dispatch(removeCartItem({ studentId, courseId }));
        // }
    };

    // Bulk checkout
    const handleCheckout = () => {
        cartItems.forEach((course) => {
            dispatch(purchaseCourse({ studentId, courseId: course.id }));
        });
    };

    // Navigate back
    const handleBack = () => {
        navigate("/student/new-course");
    };

    // Reset checkout success when component mounts
    useEffect(() => {
        dispatch(clearCheckoutState());
    }, [dispatch]);

    // Redirect after successful checkout
    useEffect(() => {
        if (checkoutSuccess) {

            dispatch(clearCheckoutState()); // reset before navigating
            navigate("/student/confirmation");
            // const timer = setTimeout(() => {
            //     dispatch(clearCheckoutState()); // reset before navigating
            //     navigate("/student/confirmation");
            // }, 2000);

            // return () => clearTimeout(timer);
        }
    }, [checkoutSuccess, navigate, dispatch]);


    return (
        <div className="checkout-page">
            <div className="checkout-navbar">
                <Studentnavbar />
            </div>

            <div className="checkout-header">
                <div className="checkout-header-top">
                    <BackButton onClick={handleBack} />
                    <h2 className="checkout-header-h2">Courses in Your Cart</h2>
                </div>
            </div>

            <div className="checkout-body">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="checkout-error">{error}</p>
                ) : cartItems.length === 0 ? (
                    <div className="checkout-empty">
                        <p>No course added yet.</p>
                    </div>
                ) : (
                    <div className="checkout-card">
                        <div className="checkout-table-wrapper">
                            <table className="checkout-table">
                                <thead>
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(({ id, title, courseName, duration }) => (
                                        <tr key={id}>
                                            <td>{title || courseName}</td>
                                            <td>{duration}</td>
                                            <td>
                                                <button
                                                    className="checkout-remove-btn"
                                                    onClick={() => handleRemove(id)}
                                                    aria-label={`Remove ${title || courseName} from cart`}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="checkout-footer">
                    <button
                        className="checkout-btn"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || checkoutLoading}
                        aria-busy={checkoutLoading}
                    >
                        {checkoutLoading ? "Processing..." : "Checkout"}
                    </button>
                    <button
                        className="checkout-back-btn"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                </div>

                {checkoutSuccess && (
                    <div className="checkout-success-msg">
                        ✅ You Purchased the course Successfully! Redirecting...
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckOut;



