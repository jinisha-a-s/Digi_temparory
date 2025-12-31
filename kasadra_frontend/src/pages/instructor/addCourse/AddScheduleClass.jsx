import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchLessons,
  fetchBatches,
  addScheduleClass,
  clearAddMessages,
} from "../../../features/instructor/addCourse/scheduleClassSlice.js";

import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice.js";

import Instructornavbar from "../../../components/Instructornavbar.jsx";
import BackButton from "../../../components/BackButton.jsx";
import toast from "react-hot-toast";
import "../../../styles/instructor/addCourse/AddScheduleClass.css";

const ScheduleClass = () => {
  const dispatch = useDispatch();
  const { courseId: routeCourseId } = useParams();
  const { user } = useSelector((state) => state.auth || {});
  
  // Get courses from another slice
  const { courses } = useSelector((state) => state.course || {});
  
  const {
    lessons,
    batches,
    lessonsLoading,
    batchesLoading,
    addLoading,
    addSuccess,
    error,
  } = useSelector((state) => state.schedule || {});

  const defaultCourseId = routeCourseId || localStorage.getItem("courseId");
  const instructorId = user?.id || localStorage.getItem("instructorId");

  const [formData, setFormData] = useState({
    course_id: defaultCourseId || "",
    batch_id: "",
    lesson_id: "",
    instructor_id: instructorId || "",
    session_date: "",
    start_time: "",
    end_time: "",
  });

  const [errors, setErrors] = useState({});

  // --------------------------
  // Fetch courses for dropdown
  // --------------------------
  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);

  // --------------------------
  // Fetch lessons & batches whenever course changes
  // --------------------------
  useEffect(() => {
    if (formData.course_id) {
      dispatch(fetchLessons(formData.course_id));
      dispatch(fetchBatches(formData.course_id));
    }
  }, [formData.course_id, dispatch]);

  // --------------------------
  // Success Toast
  // --------------------------
  useEffect(() => {
    if (addSuccess) {
      toast.success("Class scheduled successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      setErrors({});
      setFormData((prev) => ({
        ...prev,
        batch_id: "",
        lesson_id: "",
        session_date: "",
        start_time: "",
        end_time: "",
      }));

      const timer = setTimeout(() => {
        dispatch(clearAddMessages());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [addSuccess, dispatch]);

  // --------------------------
  // Error Toast
  // --------------------------
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });
    }
  }, [error]);

  // --------------------------
  // Input change
  // --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --------------------------
  // Validation
  // --------------------------
  const validate = () => {
    const newErrors = {};

    if (!formData.course_id) newErrors.course_id = "Please select a course";
    if (!formData.lesson_id) newErrors.lesson_id = "Please select a lesson";
    if (!formData.batch_id) newErrors.batch_id = "Please select a batch";
    if (!formData.session_date)
      newErrors.session_date = "Please select session date";
    if (!formData.start_time)
      newErrors.start_time = "Please select start time";
    if (!formData.end_time)
      newErrors.end_time = "Please select end time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------------
  // Submit
  // --------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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

  // --------------------------
  // Clear
  // --------------------------
  const handleCancel = () => {
    setFormData({
      course_id: defaultCourseId || "",
      batch_id: "",
      lesson_id: "",
      instructor_id: instructorId || "",
      session_date: "",
      start_time: "",
      end_time: "",
    });
    setErrors({});
    dispatch(clearAddMessages());
  };

  return (
    <div className="add-new-course-container">
      <Instructornavbar />
      <h2 className="add-new-course-title">Schedule Class</h2>

      <form className="add-new-course-form" onSubmit={handleSubmit}>
        {/* Course */}
        <div className="add-new-course-group">
          <label>Select Course</label>
          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
          >
            <option value="">
              {courses?.length === 0 ? "Loading courses..." : "Select course"}
            </option>
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.course_id && (
            <div className="form-error">{errors.course_id}</div>
          )}
        </div>

        {/* Lesson */}
        <div className="add-new-course-group">
          <label>Select Lesson</label>
          <select
            name="lesson_id"
            value={formData.lesson_id}
            onChange={handleChange}
            disabled={lessonsLoading || !formData.course_id}
          >
            <option value="">
              {lessonsLoading ? "Loading lessons..." : "Select lesson"}
            </option>
            {lessons?.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
          {errors.lesson_id && (
            <div className="form-error">{errors.lesson_id}</div>
          )}
        </div>

        {/* Batch */}
        <div className="add-new-course-group">
          <label>Select Batch</label>
          <select
            name="batch_id"
            value={formData.batch_id}
            onChange={handleChange}
            disabled={batchesLoading || !formData.course_id}
          >
            <option value="">
              {batchesLoading ? "Loading batches..." : "Select batch"}
            </option>
            {batches?.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
          {errors.batch_id && (
            <div className="form-error">{errors.batch_id}</div>
          )}
        </div>

        {/* Date */}
        <div className="add-new-course-group">
          <label>Session Date</label>
          <input
            type="date"
            name="session_date"
            value={formData.session_date}
            onChange={handleChange}
          />
          {errors.session_date && (
            <div className="form-error">{errors.session_date}</div>
          )}
        </div>

        {/* Start Time */}
        <div className="add-new-course-group">
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
          />
          {errors.start_time && (
            <div className="form-error">{errors.start_time}</div>
          )}
        </div>

        {/* End Time */}
        <div className="add-new-course-group">
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
          />
          {errors.end_time && (
            <div className="form-error">{errors.end_time}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="add-new-course-buttons">
          <button
            type="submit"
            className="add-new-course-btn add-new-course-save-btn"
            disabled={addLoading}
          >
            {addLoading ? "Saving..." : "Schedule Class"}
          </button>

          <button
            type="button"
            className="add-new-course-btn add-new-course-cancel-btn"
            onClick={handleCancel}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleClass;
