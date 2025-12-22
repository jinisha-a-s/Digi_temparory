import React, { useEffect } from "react";
import "../../../../styles/student/myCourse/newCoursePurchase/CourseOverview.css";
import Studentnavbar from "../../../../components/Studentnavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseDetails,
  addToCart,
  clearCourse,
} from "../../../../features/student/myCourse/newCoursePurchase/courseOverviewSlice"; // adjust path if needed

const CourseOverview = () => {
  const { courseId } = useParams();
  //   const courseId = 1;
  // const studentId = 1
  const studentId = localStorage.getItem("studentId");

  console.log("course-id :", courseId);
  console.log("student-id :", studentId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course, loading, error, addingToCart, addCartSuccess } = useSelector(
    (state) => state.courseOverview
  );

  useEffect(() => {
    dispatch(fetchCourseDetails(courseId));
    return () => dispatch(clearCourse());
  }, [dispatch, courseId]);

  const handleAddToCart = async () => {
    if (!course) return;

    await dispatch(addToCart({ studentId, courseId: course.id }));

    // After successful add, wait 2 seconds, then navigate
    setTimeout(() => {
      navigate("/student/checkout"); // change "/cart" to your actual route
    }, 2000);

    // navigate("/cart")
  };

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/courses");
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!course) return null;

  return (
    <div className="course-overview-container">
      <Studentnavbar />
      <h2 className="course-overview-title">Course Overview</h2>

      {/* <div className="course-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
      </div> */}

      <div className="course-overview-details">
        <p>
          <strong>Course name:</strong> {course.title}
        </p>
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>
      </div>

      <div className="course-overview-card">
        <h3 className="course-overview-topic-heading">
          Topic we cover in this course
        </h3>
        <ul className="course-overview-topic-list">
          <p className="course-overview-description">{course.description}</p>
        </ul>
      </div>

      <div className="course-overview-btn-group">
        <button
          className="btn add-btn"
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? "Adding..." : "Add to cart"}{" "}
          <span className="cart-icon">🛒</span>
        </button>
        {/* <button className="btn add-btn">
            Add to cart <span className="cart-icon">🛒</span>
          </button> */}
        <button className="btn cancel-btn" onClick={handleBack}>
          Cancel
        </button>
      </div>

      {addCartSuccess && (
        <p style={{ color: "green" }} className="success-msg">
          ✅ Course added to cart Successfully!
        </p>
      )}
    </div>
  );
};

export default CourseOverview;
