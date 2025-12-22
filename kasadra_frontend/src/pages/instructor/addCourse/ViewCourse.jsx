
import React, { useEffect } from "react";
import Instructornavbar from '../../../components/Instructornavbar'
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import BackButton from "../../../components/BackButton.jsx";
import '../../../styles/instructor/addCourse/ViewCourse.css'
import InstructorhomePage from "../InstructorhomePage.jsx";

const ViewCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // 🔹 Get courses, loading and error from Redux
    const { courses, loading, error } = useSelector((state) => state.course);

    // 🔹 Fetch instructor courses when component mounts or page reloads
    useEffect(() => {
        dispatch(fetchInstructorCourses());
    }, [dispatch, location.key]);

    return (
        <div className="view-course-page-sidebar">
            <InstructorhomePage />
            <div className="view-course-page">
                <div className="view-course-navbar">
                    <Instructornavbar />
                </div>
                <div className="view-course-container">
                    <div className="view-course-header">
                        {/* ✅ Custom back button that navigates to instructor home */}
                        <BackButton to="/instructor/home" />
                        <p className="subtitle">Courses</p>
                    </div>
                    <div className="view-course-body">
                        <div className="view-course-wrapper">

                            {/* 🔹 Error Message */}
                            {error && (
                                <p className="view-course-error">
                                    {error.detail || "Something went wrong"}
                                </p>
                            )}

                            {/* 🔹 Courses Table */}
                            <table className="view-course-table" role="table" aria-label="Courses Table">
                                <thead className="view-course-thead">
                                    <tr>
                                        <th>Course Name</th>
                                        <th>Instructor</th>
                                        <th>Enrolled</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="view-course-tbody">
                                    {courses.length > 0 ? (
                                        courses.map((course) => (
                                            <tr key={course.id} className="view-course-row">
                                                <td className="view-course-td">{course.title}</td>
                                                <td className="view-course-td">{course.instructor_name}</td>
                                                <td className="view-course-td">{course.total_enrollments || 0}</td>

                                                <td className="view-course-actions">
                                                    <button
                                                        className="view-course-btn"
                                                        onClick={() => navigate(`/courses/${course.id}/add-content`)}
                                                    >
                                                        View & Edit Lessons
                                                    </button>

                                                    <button
                                                        className="view-course-btn"
                                                        onClick={() => navigate(`/instructor/course/${course.id}/schedule`)}
                                                    >
                                                        Schedule Class
                                                    </button>

                                                    <button
                                                        className="view-course-btn"
                                                        onClick={() => navigate(`/instructor/course/${course.id}/view`)}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="view-course-empty" colSpan="4">
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
            </div>
        </div>
    )
}

export default ViewCourse