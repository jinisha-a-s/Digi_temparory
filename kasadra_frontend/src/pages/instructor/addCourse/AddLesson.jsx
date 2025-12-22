import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../styles/instructor/addCourse/AddLesson.css";
import Instructornavbar from "../../../components/Instructornavbar";
import { addLesson, resetLessonState } from "../../../features/instructor/addCourse/addLessonSlice.js";
import BackButton from "../../../components/BackButton";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import toast

const AddLesson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const { courseId } = useParams();
  const instructorId = localStorage.getItem("instructorId");

  const { loading, success, error } = useSelector((state) => state.lesson);

  // Reset state on mount
  useEffect(() => {
    dispatch(resetLessonState());
  }, [dispatch, courseId]);

  // Clear form when course changes
  useEffect(() => {
    setLessonName("");
    setDescription("");
    setValidationError("");
  }, [courseId]);

  // When lesson added successfully
  useEffect(() => {
    if (success) {
      setLessonName("");
      setDescription("");
      setValidationError("");

      // Show success toast
      toast.success("Lesson added successfully!", {
        duration: 1000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const batchId = location.state?.batchId || null;

      // Reset state and navigate AFTER toast disappears
      const timer = setTimeout(() => {
        dispatch(resetLessonState());
        navigate(`/courses/${courseId}/add-content`, {
          state: { batchId, refresh: true },
        });
      }, 1000); // matches toast duration

      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(`❌ ${error}`, {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      // Reset error state AFTER toast disappears
      const timer = setTimeout(() => {
        dispatch(resetLessonState());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch, navigate, courseId, location.state]);


  const handleOk = () => {
    setValidationError("");

    if (!lessonName.trim() || !description.trim()) {
      setValidationError("Please fill in both Lesson Name and Description.");
      return;
    }

    const lessonData = {
      instructor_id: Number(instructorId),
      course_id: Number(courseId),
      title: lessonName,
      description,
    };

    dispatch(addLesson(lessonData));
  };

  return (
    <div className="add-lesson-container">
      {/* Toast container */}
      <Toaster />

      <div className="add-lesson-navbar">
        <Instructornavbar />
      </div>

      <div className="add-lesson-body">
        <div className="add-lesson-card">
          <div className="add-lesson-header">
            <BackButton />
            <h2 className="add-lesson-title">Add New Lesson</h2>
          </div>

          <div className="add-lesson-field">
            <label>Lesson Name</label>
            <input
              type="text"
              placeholder="Enter Lesson name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="add-lesson-input"
            />
          </div>

          <div className="add-lesson-field">
            <label>Description</label>
            <textarea
              placeholder="Enter Lesson description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="add-lesson-input"
            />
          </div>

          {validationError && <p className="add-lesson-error">{validationError}</p>}


          <div className="add-lesson-buttons">
            <button className="add-lesson-btn-ok" onClick={handleOk} disabled={loading}>
              {loading ? "Adding..." : "OK"}
            </button>

            <button
              className="add-lesson-btn-clear"
              onClick={() => {
                setLessonName("");
                setDescription("");
                setValidationError("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
