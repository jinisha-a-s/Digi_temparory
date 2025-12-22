import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/instructor/addCourse/View.css";
import Instructornavbar from "../../../components/Instructornavbar.jsx";
import BackButton from "../../../components/BackButton.jsx";
import { fetchCourseDetails } from "../../../features/instructor/addCourse/viewSlice.js";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetails, courseLoading, courseError } = useSelector(
    (state) => state.courseDetails
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetails(courseId));
    }
  }, [courseId, dispatch]);

  const handleBackClick = () => navigate(-1);

//   if (courseLoading) return <p>Loading...</p>;
  if (courseError) return <p className="error">{courseError}</p>;

  // Dummy enrollment stats
  const enrollmentStats = {
    totalEnrolled: 20,
    activeStudents: 18,
    inactiveStudents: 2,
  };

  return (
    <div className="course-details-container">
      <Instructornavbar />
      <div className="course-details-body">
        <div className="course-details-main-header">
          <BackButton onClick={handleBackClick} />
          <h2 className="course-details-title">Course Details</h2>
        </div>

        {/* Field Details Table */}
        {courseDetails && (
          <div className="course-details-table-card">
            <table className="course-details-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Course Name</td>
                  <td>{courseDetails?.title || "N/A"}</td>
                </tr>
                {/* <tr>
                  <td>Course Code</td>
                  <td>{courseDetails?.courseCode || "N/A"}</td>
                </tr> */}
                <tr>
                  <td>Instructor</td>
                  <td>{courseDetails?.instructor_name || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Enrollment Stats Table (Dummy) */}
        <h3 className="course-details-section-heading">Enrollment Stats</h3>
        <div className="course-details-table-card">
          <table className="course-details-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Enrolled Students</td>
                <td>{enrollmentStats.totalEnrolled}</td>
              </tr>
              <tr>
                <td>Active Students</td>
                <td>{enrollmentStats.activeStudents}</td>
              </tr>
              <tr>
                <td>Inactive Students</td>
                <td>{enrollmentStats.inactiveStudents}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
