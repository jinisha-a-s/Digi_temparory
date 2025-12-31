import React, { useEffect } from "react";
import Instructornavbar from '../../../components/Instructornavbar'
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import '../../../styles/instructor/addCourse/ViewCourse.css'
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const ViewCourse = () => {

    // const items = [
    //     { label: "Courses", path: "" }, // simple generic breadcrumb
    // ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { courses, loading, error } = useSelector((state) => state.course);

    useEffect(() => {
        dispatch(fetchInstructorCourses());
    }, [dispatch, location.key]);

    return (
        <div className="view-course-page-sidebar">

            <div className="view-course-page">
                <div className="view-course-navbar">
                    {/* You can add instructor navbar here */}
                </div>

                <div className="view-course-container">

                    {/* 🔹 Breadcrumb placed above the subtitle */}
                    {/* <Breadcrumb items={items} /> */}

                    <div className="view-course-header">
                        <p className="subtitle">Courses</p>
                    </div>

                    <div className="view-course-body">
                        <div className="view-course-wrapper">

                            {error && (
                                <p className="view-course-error">
                                    {error.detail || "Something went wrong"}
                                </p>
                            )}

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
                                                        onClick={() =>
                                                            navigate(`/instructor/courses/${course.id}/add-content`)
                                                        }
                                                    >
                                                        View & Edit Lessons
                                                    </button>

                                                    <button
                                                        className="view-course-btn"
                                                        onClick={() =>
                                                            navigate(`/instructor/course/${course.id}/schedule`)
                                                        }
                                                    >
                                                        Schedule Class
                                                    </button>

                                                    <button
                                                        className="view-course-btn"
                                                        onClick={() =>
                                                            navigate(`/instructor/course/${course.id}/view`)
                                                        }
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
