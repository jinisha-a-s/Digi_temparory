import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  fetchBatches,
  fetchSchedule,
  updateSchedule,
} from "../../../features/instructor/scheduleClass/UpdateCalenderSlice";
import "../../../styles/instructor/scheduleClass/UpdateCalender.css";
import Instructornavbar from "../../../components/Instructornavbar";

const UpdateCalender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, batches, lessons, loading } = useSelector(
    (state) => state.scheduleClass
  );

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedLessons, setEditedLessons] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(fetchBatches(Number(selectedCourse)));
    }
  }, [selectedCourse, dispatch]);

  useEffect(() => {
    if (selectedCourse && selectedBatch) {
      dispatch(
        fetchSchedule({
          courseId: selectedCourse,
          batchId: selectedBatch,
        })
      );
    }
  }, [selectedCourse, selectedBatch, dispatch]);

  /* =========================
     HELPERS
  ========================= */
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const hasLessons = lessons && lessons.length > 0;

  /* =========================
     HANDLERS
  ========================= */
  const handleEditClick = () => {
    if (isEditing) {
      editedLessons.forEach((lesson) =>
        dispatch(
          updateSchedule({
            calendarId: lesson.calendar_id,
            scheduleData: lesson,
          })
        )
      );
      setIsEditing(false);
    } else {
      setEditedLessons(
        lessons.map((l) => ({
          ...l,
          calendar_id: l.calendar_id || l.id,
        }))
      );
      setIsEditing(true);
    }
  };

  const handleLessonChange = (calendarId, field, value) => {
    setEditedLessons((prev) =>
      prev.map((lesson) => {
        if (lesson.calendar_id === calendarId) {
          const updated = { ...lesson, [field]: value };
          if (field === "date" || field === "select_date") {
            updated.day = getDayName(value);
          }
          return updated;
        }
        return lesson;
      })
    );
  };

  const handleScheduleClass = () => {
    navigate("/instructor/course/schedule", {
      state: {
        courseId: selectedCourse,
        batchId: selectedBatch,
      },
    });
  };

  const filteredLessons = lessons.filter((lesson) =>
    lesson.lesson_title.toLowerCase().includes(searchText.toLowerCase())
  );

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="update-calender-instructor-home">
      <Instructornavbar />

      {/* HEADER */}
      <div className="update-calender-all-header">
        <div className="update-calender-header-left">
          <p className="update-calender-title">Update Class Schedule</p>
        </div>

        {/* CONTROLS */}
        <div className="update-calender-controls">
          {/* COURSE */}
          <div className="update-calender-control-item">
            <label>Select Course</label>
            <select
              className={`update-calender-select ${
                !selectedCourse ? "highlight" : ""
              }`}
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedBatch("");
              }}
            >
              <option value="">Select Course</option>
              {courses?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* BATCH */}
          <div className="update-calender-control-item">
            <label>Select Batch</label>
            <select
              className={`update-calender-select ${
                selectedCourse && !selectedBatch ? "highlight" : ""
              }`}
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">Select Batch</option>
              {loading ? (
                <option>Loading batches...</option>
              ) : batches.length === 0 ? (
                <option>No batches available</option>
              ) : (
                batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* SEARCH */}
          <div className="update-calender-search-box">
            <input
              type="text"
              className={`update-calender-search-input ${
                searchOpen ? "open" : ""
              }`}
              placeholder="Search lesson..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="update-calender-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {selectedCourse && selectedBatch && (
        <div className="update-calender-card">
          <div className="update-calender-table-wrapper">
            <table className="update-calender-table">
              <thead>
                <tr>
                  <th>Lesson Name</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Timing</th>
                </tr>
              </thead>

              <tbody>
                {(isEditing ? editedLessons : filteredLessons).length > 0 ? (
                  (isEditing ? editedLessons : filteredLessons).map((lesson) => (
                    <tr key={lesson.calendar_id}>
                      <td>{lesson.lesson_title}</td>

                      <td>
                        {isEditing ? (
                          <input
                            type="date"
                            value={lesson.select_date || lesson.date}
                            onChange={(e) =>
                              handleLessonChange(
                                lesson.calendar_id,
                                "select_date",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          new Date(
                            lesson.select_date || lesson.date
                          ).toLocaleDateString("en-GB")
                        )}
                      </td>

                      <td>{lesson.day}</td>

                      <td>
                        {isEditing ? (
                          <>
                            <input
                              type="time"
                              value={lesson.start_time || ""}
                              onChange={(e) =>
                                handleLessonChange(
                                  lesson.calendar_id,
                                  "start_time",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="time"
                              value={lesson.end_time || ""}
                              onChange={(e) =>
                                handleLessonChange(
                                  lesson.calendar_id,
                                  "end_time",
                                  e.target.value
                                )
                              }
                            />
                          </>
                        ) : lesson.start_time ? (
                          `${lesson.start_time} - ${lesson.end_time}`
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-table-row">
                    <td colSpan="4">
                      {loading
                        ? "Loading..."
                        : "No classes scheduled yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="update-calender-buttons">
            <button
              onClick={handleScheduleClass}
              className="update-calender-btn-secondary"
            >
              Schedule Class
            </button>

            {hasLessons && (
              <button
                onClick={handleEditClick}
                className="update-calender-btn-create"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCalender;
