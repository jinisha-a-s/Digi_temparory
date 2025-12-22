 

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchLessons,
  fetchBatches,
  addScheduleClass,
  clearAddMessages,
} from "../../../features/instructor/addCourse/scheduleClassSlice.js";
import Instructornavbar from "../../../components/Instructornavbar.jsx";
import BackButton from "../../../components/BackButton.jsx";
import "../../../styles/instructor/addCourse/AddScheduleClass.css";

const ScheduleClass = () => {
  const dispatch = useDispatch();
  const { courseId: routeCourseId } = useParams();
  const { user } = useSelector((state) => state.auth || {});
  const {
    lessons,
    batches,
    lessonsLoading,
    batchesLoading,
    addLoading,
    addSuccess,
  } = useSelector((state) => state.schedule || {});

  const courseId = routeCourseId || localStorage.getItem("courseId");
  const instructorId = user?.id || localStorage.getItem("instructorId");

  const [formData, setFormData] = useState({
    course_id: courseId || "",
    batch_id: "",
    lesson_id: "",
    instructor_id: instructorId || "",
    session_date: "",
    start_time: "",
    end_time: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Fetch lessons + batches on mount
  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons(courseId));
      dispatch(fetchBatches(courseId));
    }
  }, [courseId, dispatch]);

  // ✅ Success message handler
  useEffect(() => {
    if (addSuccess) {
      setSuccessMessage(addSuccess);

      setFormData({
        course_id: courseId || "",
        batch_id: "",
        lesson_id: "",
        instructor_id: instructorId || "",
        session_date: "",
        start_time: "",
        end_time: "",
      });

      const timer = setTimeout(() => {
        setSuccessMessage("");
        dispatch(clearAddMessages());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [addSuccess, dispatch, courseId, instructorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lesson_id, batch_id, session_date, start_time, end_time } =
      formData;
    if (!lesson_id) return alert("Please select a lesson");
    if (!batch_id) return alert("Please select a batch");
    if (!session_date) return alert("Please select session date");
    if (!start_time) return alert("Please select start time");
    if (!end_time) return alert("Please select end time");

    dispatch(
      addScheduleClass({
        course_id: Number(formData.course_id),
        batch_id: Number(formData.batch_id),
        lesson_id: Number(formData.lesson_id),
        instructor_id: Number(formData.instructor_id),
        session_date: formData.session_date,
        start_time: `${formData.start_time}:00`,
        end_time: `${formData.end_time}:00`,
      })
    );
  };

  const handleCancel = () => {
    setFormData({
      course_id: courseId || "",
      batch_id: "",
      lesson_id: "",
      instructor_id: instructorId || "",
      session_date: "",
      start_time: "",
      end_time: "",
    });
    setSuccessMessage("");
    dispatch(clearAddMessages());
  };

  return (
    <div className="schedule-class-main-container">
      <Instructornavbar />
      <div className="schedule-close-btn">
        <BackButton className="schedual-details-close-button" />
        <h2 className="schedule-class-title">Schedule Class</h2>
      </div>

      <div className="schedule-class-container">
        <form className="schedule-class-form" onSubmit={handleSubmit}>
          {/* Lesson dropdown */}
          <div className="schedule-class-row">
            <label className="schedule-class-label">Select Lesson</label>
            <select
              name="lesson_id"
              value={formData.lesson_id}
              onChange={handleChange}
              className="schedule-class-input"
              disabled={lessonsLoading}
            >
              <option value="">
                {lessonsLoading ? "Loading lessons..." : "Select Lesson"}
              </option>
              {Array.isArray(lessons) &&
                lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Batch dropdown */}
          <div className="schedule-class-row">
            <label className="schedule-class-label">Select Batch</label>
            <select
              name="batch_id"
              value={formData.batch_id}
              onChange={handleChange}
              className="schedule-class-input"
              disabled={batchesLoading}
            >
              <option value="">
                {batchesLoading ? "Loading batches..." : "Select Batch"}
              </option>
              {Array.isArray(batches) &&
                batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Date */}
          <div className="schedule-class-row">
            <label className="schedule-class-label">Session Date</label>
            <input
              type="date"
              name="session_date"
              value={formData.session_date}
              onChange={handleChange}
              className="schedule-class-input"
            />
          </div>

          {/* Start time */}
          <div className="schedule-class-row">
            <label className="schedule-class-label">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="schedule-class-input"
            />
          </div>

          {/* End time */}
          <div className="schedule-class-row">
            <label className="schedule-class-label">End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="schedule-class-input"
            />
          </div>

          {/* Success message */}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          {/* Buttons */}
          <div className="schedule-class-actions">
            <button
              type="submit"
              className="schedule-btn save"
              disabled={addLoading || lessonsLoading || batchesLoading}
            >
              {addLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="schedule-btn cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClass;

