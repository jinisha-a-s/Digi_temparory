// src/pages/instructor/addCourse/AddConcept.jsx

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";

// Redux actions for adding concept & clearing messages
import { addConcept, clearMessages } from "../../../features/instructor/addCourse/addConceptSlice";
import Instructornavbar from "../../../components/Instructornavbar";
import InstructorSidebar from "../../../components/InstructorSidebar";
import "../../../styles/instructor/addCourse/AddConcept.css";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // ✅ useLocation for getting navigation state

const AddConcept = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // --------------------
  // Redux selectors
  // --------------------
  const { loading, error, success } = useSelector((state) => state.concept || {});
  const { lastAddedLessonId } = useSelector((state) => state.lesson || {});

  const instructorId = localStorage.getItem("instructorId"); // Get logged-in instructor
  const { courseId } = useParams(); // Get courseId from route params
  const location = useLocation(); // Get navigation state (e.g., lessonId passed from previous page)

  // --------------------
  // Determine lessonId to use
  // Priority: existingLessonId (from navigation state) > lastAddedLessonId (from Redux)
  // --------------------
  const existingLessonId = location.state?.lessonId;
  const finalLessonId = existingLessonId || lastAddedLessonId;

  // --------------------
  // Local state
  // --------------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ title: "", description: "", file: "" });
  const [showPopup, setShowPopup] = useState(false);

  // --------------------
  // Refs for focusing inputs when validation fails
  // --------------------
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const fileRef = useRef(null);

  // --------------------
  // Clear Redux messages when component mounts
  // --------------------
  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);


  // --------------------
  // Reset form on successful save
  // --------------------
  useEffect(() => {
    if (success) {
      setTitle("");
      setDescription("");
      setFile(null);
      setErrors({ title: "", description: "", file: "" });
      if (fileRef.current) fileRef.current.value = ""; // Reset file input

      if (fileRef.current) fileRef.current.value = ""; // Reset file input
      setShowPopup(true); // show popup

      // ✅ After 2 seconds, navigate to AddQuiz
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate(`/instructor/add-quiz/${courseId}`, {
          state: { lessonId: finalLessonId }, // pass lessonId forward
        });
        dispatch(clearMessages());
      }, 1000);

      return () => clearTimeout(timer); // cleanup

    }
  }, [success]);

  // --------------------
  // Handle file input
  // ✅ Validates file type & size before setting in state
  // --------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    const newErrors = { ...errors };

    if (!allowedTypes.includes(selectedFile.type)) {
      newErrors.file = "*Only PDF or Word documents are allowed.";
      setFile(null);
    } else if (selectedFile.size > maxSize) {
      newErrors.file = "*File size should not exceed 5MB.";
      setFile(null);
    } else {
      newErrors.file = "";
      setFile(selectedFile);
    }

    setErrors(newErrors);
  };

  // --------------------
  // Form submission
  // --------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous Redux messages
    dispatch(clearMessages());

    // Validation: ensure lessonId exists
    if (!finalLessonId) {
      setErrors((prev) => ({ ...prev, file: "*Please add/select a lesson first." }));
      if (fileRef.current) fileRef.current.focus();
      return;
    }

    // Local validation
    const newErrors = {
      title: title.trim() ? "" : "*Title is required",
      description: description.trim() ? "" : "*Description is required",
      file: errors.file || (file ? "" : "*File is required"),
    };
    setErrors(newErrors);

    // Focus first input with error
    if (newErrors.title) return titleRef.current.focus();
    if (newErrors.description) return descRef.current.focus();
    if (newErrors.file) return fileRef.current.focus();

    // Create FormData to send via API (multipart/form-data)
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("file", file);
    formData.append("course_id", courseId);
    formData.append("lesson_id", finalLessonId);
    formData.append("instructor_id", instructorId);

    // Dispatch Redux action to add concept
    dispatch(addConcept(formData));
  };

  // --------------------
  // Cancel button
  // --------------------
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setErrors({ title: "", description: "", file: "" });

    if (fileRef.current) fileRef.current.value = ""; // Reset file input

    dispatch(clearMessages());
  };

  // --------------------
  // Render
  // --------------------
  return (
    <div className="add-concept-container">
      <Instructornavbar />
      <div className="add-concept-body">
        <InstructorSidebar active="Concept" courseId={courseId} />
        <div className="add-concept-form-div">
          <form className="add-concept-form" onSubmit={handleSubmit}>
            {/* Title */}
            <label>
              Concept Title
              <input
                ref={titleRef}
                type="text"
                placeholder="Enter concept title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="lesson-error-message">{errors.title}</p>}
            </label>

            {/* Description */}
            <label>
              Description
              <textarea
                ref={descRef}
                placeholder="Enter concept description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className="lesson-error-message">{errors.description}</p>}
            </label>

            {/* File Upload */}
            <label>
              Upload File
              <input ref={fileRef} type="file" onChange={handleFileChange} />
              {file && !errors.file && (
                <p style={{ fontSize: "12px", color: "#555", marginTop: "6px" }}>
                  Selected file: <strong>{file.name}</strong>
                </p>
              )}
              {errors.file && <p className="lesson-error-message">{errors.file}</p>}
            </label>

            {/* Redux error/success messages */}
            {error && <p className="lesson-error-message">{error}</p>}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3 data-testid="success-message">{success}</h3>
                  <p>Redirecting you to the Quiz page...</p>
                  <div className="popup-loader"></div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="form-buttons">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddConcept;
