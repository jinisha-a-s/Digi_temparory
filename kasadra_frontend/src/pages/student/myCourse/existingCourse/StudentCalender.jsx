import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSchedule } from "../../../../features/student/myCourse/existingCourse/studentCalenderSlice";
import StudentNavbar from "../../../../components/Studentnavbar";
// import StudentSidebar from "../../../../components/StudentSidebar";
import "../../../../styles/student/myCourse/existingCourse/StudentCalender.css";

const StudentCalendar = () => {
  const { courseId } = useParams();
  const studentId = Number(localStorage.getItem("studentId"));
  const dispatch = useDispatch();
  const { lessons, loading, error } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (studentId && courseId) {
      dispatch(fetchSchedule({ studentId, courseId }));
    }
  }, [studentId, courseId, dispatch]);

  return (
    <div className="student-calendar-container">
      <StudentNavbar />

      {/* MAIN CONTENT */}
      <div className="student-calendar-content-wrapper">
        <h2 className="student-calendar-title">📅 Course Schedule</h2>

        {loading && (
          <p className="student-calendar-message">Loading schedule...</p>
        )}

        {error && (
          <p className="student-calendar-error">
            ⚠️ {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        {!loading && !error &&
          (Array.isArray(lessons) && lessons.length > 0 ? (
            <div className="student-calendar-schedule-card">
              <table className="student-calendar-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Lesson Name</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Timing</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson, index) => (
                    <tr key={lesson.id} className="student-calendar-row">
                      <td>{index + 1}</td>
                      <td className="student-calendar-lesson-title">
                        {lesson.title}
                      </td>
                      <td>{lesson.date}</td>
                      <td>{lesson.day}</td>
                      <td>
                        <span className="student-calendar-timing-tag">
                          {lesson.start} - {lesson.end}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="student-calendar-message">
              No lessons scheduled yet.
            </p>
          ))}
      </div>
    </div>
  );

};

export default StudentCalendar;
