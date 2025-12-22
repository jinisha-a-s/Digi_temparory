import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../../../features/student/myCourse/existingCourse/myCourseSlice";
import StudentNavbar from "../../../../components/Studentnavbar";
import "../../../../styles/student/myCourse/existingCourse/MyCoursePage.css";

const MyCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { purchased, recommended, loading, error } = useSelector(
    (state) => state.myCourse
  );

  const studentId = Number(localStorage.getItem("studentId"));
  console.log("Student ID:", studentId);

  useEffect(() => {


    if (studentId) {
      dispatch(getCourses(studentId));
    }
  }, [dispatch]);
  console.log("Purchased:", purchased);
  console.log("Recommended:", recommended);

  const handleContinue = (courseId) => {
    navigate(`/student/course/${courseId}/calendar`);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderCourseCard = (course) => (
    <div className="course-card" key={course.id}>
      <img src={course.thumbnail} alt={course.title} className="img" />
      <h3>{course.title}</h3>
      <p>{course.description}</p>

      {/* 🔥 Separate Continue & Explore logic */}
      {purchased.some((c) => c.id === course.id) ? (
        <button
          className="continue-btn"
          onClick={() => handleContinue(course.id)}
        >
          Continue
        </button>

      ) : (
        <button
          className="explore-btn"
          onClick={() => navigate(`/student/course/${course.id}/course-overview`)}
        >
          Explore
        </button>
      )}
    </div>
  );


  return (
    <>
      <StudentNavbar />
      <div className="my-course-page">
        {purchased?.length > 0 ? (
          <>
            <h2>Courses You've Joined</h2>
            <div className="course-grid">{purchased.map(renderCourseCard)}</div>

            {recommended?.length > 0 ? (
              <>
                <h2>Recommended Courses</h2>
                <div className="course-grid">{recommended.map(renderCourseCard)}</div>
              </>
            ) : (
              <p className="no-recommendation">You have purchased all available courses 🎉</p>
            )}
          </>
        ) : (
          <>
            <h2>All Courses</h2>
            <div className="course-grid">{recommended?.map(renderCourseCard)}</div>
          </>
        )}
      </div>
    </>
  );
};

export default MyCoursePage;
