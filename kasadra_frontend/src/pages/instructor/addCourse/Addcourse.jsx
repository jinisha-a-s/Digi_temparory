import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../styles/instructor/addCourse/AddCourse.css";
import Instructornavbar from "../../../components/Instructornavbar";
import Spinner from "../../../components/Spinner.jsx";
import BackButton from "../../../components/BackButton.jsx";
import InstructorhomePage from "../InstructorhomePage.jsx";

export default function AddCourse() {
  const dispatch = useDispatch(); // ✅ Redux dispatch to call actions
  const navigate = useNavigate(); // ✅ Navigation hook to move between pages
  const location = useLocation(); // ✅ Track page reloads to re-fetch data if needed

  // console.log('courseid', course.id);

  // ✅ Get course data, loading, and error from Redux store
  const { courses, loading, error } = useSelector((state) => state.course);

  // ✅ Fetch instructor's courses when component mounts or page changes
  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch, location.key]);

  console.log(error, "error"); // ✅ For debugging API errors in console

  return (
    <div className="AC-instructor-home">
      <InstructorhomePage />
      <div className="ac-wrap">
        {/* ✅ Navbar for instructor layout */}
        <Instructornavbar />

        {/* ✅ Header section with title and “Add New Course” button */}
        <div className="ac-header">
          <div className="ac-title">
            {/* ✅ Custom back button that navigates to instructor home */}
            <BackButton to="/instructor/home" />
            <p className="subtitle">Courses</p>
          </div>

          {/* ✅ Button to add a new course */}
          <div className="ac-controls">
            <button
              className="btn-add"
              onClick={() => navigate("/add-new-course")}
            >
              Add New Course
            </button>
          </div>
        </div>

        {/* ✅ Main content area for the course table */}
        <div className="ac-card">
          {/* ✅ Show error message if something goes wrong */}
          {error && <p className="error-text">{error.detail || "Something went wrong"}</p>}

          {/* ✅ Table displaying all instructor’s courses */}
          <table className="ac-custom-table" role="table" aria-label="Courses table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Enrolled</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.length > 0 ? (
                // ✅ Map through each course and render a row
                courses.map((course) => (
                  <tr key={course.id} className="table-row">
                    <td>{course.title}</td>
                    <td>{course.instructor_name}</td>
                    <td>{course.total_enrollments || 0}</td>

                    {/* ✅ Action buttons for managing each course */}
                    <td>
                      <button
                        className="btn-action"
                        onClick={() => navigate(`/courses/${course.id}/add-content`)}
                      >
                        View & Edit Lessons
                      </button>
                      <button
                        className="btn-action"
                        onClick={() => navigate(`/instructor/course/${course.id}/schedule`)}
                      >
                        Schedule Class
                      </button>
                      <button
                        className="btn-action"
                        onClick={() => navigate(`/instructor/course/${course.id}/view`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // ✅ Show spinner while loading or “No courses found” if empty
                <tr>
                  <td colSpan="4">
                    {loading ? (
                      <Spinner data-testid="loading-spinner" />
                    ) : (
                      "No courses found."
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
