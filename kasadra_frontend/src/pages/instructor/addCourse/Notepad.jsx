import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createNote, reset } from "../../../features/instructor/addCourse/notePadSlice";
import "../../../styles/instructor/addCourse/NotePad.css";
import Instructornavbar from "../../../components/Instructornavbar";
import toast, { Toaster } from "react-hot-toast";

const NotepadEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const instructorId = localStorage.getItem("instructorId");

  const { notes, loading, success, error, successMessage, errorMessage } = useSelector(
    (state) => state.notes
  );

  const [validationError, setValidationError] = useState("");
  const editorRef = useRef(null);

  // Text formatting functions
  const applyFormat = (cmd) => document.execCommand(cmd, false, null);
  const applyHighlight = () => document.execCommand("backColor", false, "yellow");

  // Save note
  const handleSave = () => {
    if (!editorRef.current) return;

    const text = editorRef.current.innerHTML;

    // Frontend validation
    if (!text.trim()) {
      setValidationError("Note is empty!");
      return;
    }
    if (!courseId || !lessonId || !instructorId) {
      setValidationError("Missing required IDs!");
      return;
    }

    setValidationError(""); // clear validation errors

    const payload = {
      course_id: Number(courseId),
      lesson_id: Number(lessonId),
      instructor_id: Number(instructorId),
      notes: text,
    };

    dispatch(createNote(payload));
  };

  // Clear editor
  const handleClear = () => {
    if (editorRef.current) editorRef.current.innerHTML = "";
    setValidationError("");
    dispatch(reset());
  };

  // Backend success → toast + redirect
  useEffect(() => {
    if (success) {
      toast.success(successMessage || "✅ Note saved successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => {
        dispatch(reset());
        navigate(`/instructor/${courseId}/${lessonId}/lesson-content`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, successMessage, dispatch, navigate, courseId, lessonId]);

  // Backend error → toast
  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "❌ Something went wrong!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => dispatch(reset()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, errorMessage, dispatch]);

  // Load latest saved note into editor
  useEffect(() => {
    if (success && editorRef.current && notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      editorRef.current.innerHTML = latestNote.notes;
    }
  }, [success, notes]);

  return (
    <>
      <Toaster />
      <div className="note-content-navbar">
        <Instructornavbar />
      </div>

      <div className="editor-container">
        <h2 className="editor-title">Notes</h2>

        <div className="toolbar">
          <button onClick={() => applyFormat("bold")}><b>B</b></button>
          <button onClick={() => applyFormat("italic")}><i>I</i></button>
          <button onClick={() => applyFormat("underline")}><u>U</u></button>
          <button onClick={applyHighlight} className="highlight-btn">H</button>
          <button onClick={() => applyFormat("insertUnorderedList")}>• List</button>
          <button onClick={() => applyFormat("insertOrderedList")}>1. List</button>
        </div>

        <div
          ref={editorRef}
          className="editor-box"
          contentEditable
          suppressContentEditableWarning={true}
        ></div>

        {/* Frontend validation error */}
        {validationError && <p className="editor-message editor-error">{validationError}</p>}

        <div className="editor-actions">
          <button className="btn primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn secondary" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default NotepadEditor;
