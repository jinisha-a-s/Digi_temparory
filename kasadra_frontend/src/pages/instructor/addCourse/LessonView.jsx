// ========================================================================
// LESSON PREVIEW — CLEAN CODE VERSION (NO LOGIC CHANGES)
// Command-style comments are added for clarity
// ========================================================================

import React, { useState, useEffect, useRef } from "react";
import "../../../styles/instructor/addCourse/LessonView.css";
import Instructornavbar from "../../../components/Instructornavbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchLessonById,
  updateLesson,
  updatePdf,
  updateWeblink,
  updateNote,
  updateQuiz,
  updateLab,
  deleteLesson,
  deletePdf,
  deleteWeblink,
  deleteNote,
  deleteQuiz,
  deleteLab,
} from "../../../features/instructor/addCourse/lessonViewSlice";

import ClickableLink from "../../../components/ClickableLink";
import BackButton from "../../../components/BackButton";
import Breadcrumb from "../../../components/Breadcrumb.jsx";


// ========================================================================
// COMPONENT START
// ========================================================================

const LessonPreview = () => {
  const { courseId, lessonId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instructorId = localStorage.getItem("instructorId");

  const noteEditorRef = useRef(null);

  const { lesson } = useSelector((state) => state.lessonView);

  // UI State
  // const [openLesson, setOpenLesson] = useState(null);
  const [openContent, setOpenContent] = useState(null);
  const [isEditingLesson, setIsEditingLesson] = useState(false);

  const [editingContentId, setEditingContentId] = useState(null);

  const [lessonSaving, setLessonSaving] = useState(false);
  const [contentSavingId, setContentSavingId] = useState(null);
  const [contentDeletingId, setContentDeletingId] = useState(null);

  const [lessonData, setLessonData] = useState(null);

  const items = [
    { label: "Courses", path: "/instructor/view-course" },
    { label: "Lessons", path: "/instructor/courses/1/add-content" },
    { label: "View Lesson", path: "" },
  ];

  // --------------------------------------------------------------------
  // STEP 1 — FETCH LESSON ON LOAD
  // --------------------------------------------------------------------
  useEffect(() => {
    dispatch(fetchLessonById(lessonId));
  }, [lessonId, dispatch]);

  // --------------------------------------------------------------------
  // STEP 2 — FORMAT LESSON DATA AFTER FETCH
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!lesson) return;

    const formattedLesson = {
      id: lesson.id,
      name: lesson.title,
      description: lesson.description,
      contents: [
        ...lesson.pdfs.map((p) => ({
          id: `pdf-${p.id}`,
          originalId: p.id,
          type: "PDF",
          url: p.file_url,
          file: null,
        })),
        ...lesson.weblinks.map((w) => ({
          id: `weblink-${w.id}`,
          originalId: w.id,
          type: "Weblink",
          url: w.url,
        })),
        ...lesson.notes.map((n) => ({
          id: `note-${n.id}`,
          originalId: n.id,
          type: "Note",
          html: n.notes,
        })),
        ...lesson.quizzes.map((q) => ({
          id: `quiz-${q.id}`,
          originalId: q.id,
          type: "Quiz",
          name: q.name,
          description: q.description,
          url: q.url || q.file_url,
          file: q.file_url,
        })),
        ...lesson.labs.map((l) => ({
          id: `lab-${l.id}`,
          originalId: l.id,
          type: "Lab",
          name: l.name,
          description: l.description,
          url: l.url || l.file_url,
          file: l.file_url,
        })),
      ],
    };

    setLessonData(formattedLesson);
  }, [lesson]);

  // ====================================================================
  // SAVE LESSON DETAILS
  // ====================================================================

  const handleLessonEdit = async () => {
    if (!isEditingLesson) {
      setIsEditingLesson(true);
      return;
    }

    // STEP — SAVE LESSON
    try {
      setLessonSaving(true);

      await dispatch(
        updateLesson({
          lessonId,
          data: {
            title: lessonData.name,
            description: lessonData.description,
          },
        })
      );

      await dispatch(fetchLessonById(lessonId));
    } catch (err) {
      console.error("Lesson update failed", err);
    }

    setLessonSaving(false);
    setIsEditingLesson(false);
  };

  // ====================================================================
  // SAVE CONTENT (PDF / WEBLINK / NOTE / QUIZ / LAB)
  // ====================================================================

  const handleContentEdit = async (item) => {
    const type = item.type.toLowerCase();
    const isSaving = editingContentId === item.id;

    if (!isSaving) {
      // ENABLE EDIT MODE
      setEditingContentId(item.id);
      return;
    }

    // ----------------------------------------------------------------
    // STEP — SAVE CONTENT
    // ----------------------------------------------------------------
    try {
      setContentSavingId(item.id);

      switch (type) {
        // ------------------------------
        case "pdf":
          const pdfFD = new FormData();
          pdfFD.append("course_id", courseId);
          pdfFD.append("lesson_id", lessonId);
          if (item.file) pdfFD.append("file", item.file);

          await dispatch(updatePdf({ pdfId: item.originalId, data: pdfFD }));
          break;

        // ------------------------------
        case "weblink":
          const linkFD = new FormData();
          linkFD.append("course_id", courseId);
          linkFD.append("lesson_id", lessonId);
          linkFD.append("link_url", item.url);

          await dispatch(
            updateWeblink({ weblinkId: item.originalId, data: linkFD })
          );
          break;

        // ------------------------------
        case "note":
          const payload = {
            note_id: item.originalId,
            notes: noteEditorRef.current?.innerHTML || item.html,
            course_id: courseId,
            lesson_id: lessonId,
            instructor_id: instructorId,
          };

          await dispatch(updateNote({ noteId: item.originalId, data: payload }));
          break;

        // ------------------------------
        case "quiz":
          const quizFD = new FormData();
          quizFD.append("quiz_id", item.originalId);
          quizFD.append("name", item.name);
          quizFD.append("description", item.description);

          if (item.url && item.url.startsWith("http"))
            quizFD.append("url", item.url);

          if (item.file instanceof File) quizFD.append("file", item.file);

          await dispatch(updateQuiz({ quizId: item.originalId, data: quizFD }));
          break;

        // ------------------------------
        case "lab":
          const labFD = new FormData();
          labFD.append("lab_id", item.originalId);
          labFD.append("name", item.name);
          if (item.description) labFD.append("description", item.description);

          if (item.url && item.url.startsWith("http"))
            labFD.append("url", item.url);

          if (item.file instanceof File) labFD.append("file", item.file);

          await dispatch(updateLab({ labId: item.originalId, data: labFD }));
          break;

        // ------------------------------
        default:
          console.warn("Unknown content type:", type);
      }

      await dispatch(fetchLessonById(lessonId));
    } catch (err) {
      console.error(`Failed to update ${type}`, err);
    }

    setContentSavingId(null);
    setEditingContentId(null);
  };

  // ====================================================================
  // DELETE LESSON ENTIRELY
  // ====================================================================

  const handleLessonDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await dispatch(deleteLesson(lessonId));
      navigate(`/courses/${courseId}/add-content`, { state: { refresh: true } });  // redirect after delete
    } catch (error) {
      console.error("Lesson delete failed:", error);
    }
  };


  // ====================================================================
  // DELETE CONTENT
  // ====================================================================

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this ${item.type}?`)) return;

    const type = item.type.toLowerCase();
    setContentDeletingId(item.id);

    try {
      switch (type) {
        case "pdf":
          await dispatch(deletePdf(item.originalId));
          break;
        case "weblink":
          await dispatch(deleteWeblink(item.originalId));
          break;
        case "note":
          await dispatch(deleteNote(item.originalId));
          break;
        case "quiz":
          await dispatch(deleteQuiz(item.originalId));
          break;
        case "lab":
          await dispatch(deleteLab(item.originalId));
          break;
      }

      await dispatch(fetchLessonById(lessonId));
    } catch (err) {
      console.error(`Delete ${type} failed`, err);
    }

    setContentDeletingId(null);
  };

  // ====================================================================
  // UI RENDER
  // ====================================================================

  if (!lessonData) return <p>Loading...</p>;

  return (
    <div className="lesson-view-page">
      <div className="lesson-view-navbar">
        <Instructornavbar />
      </div>

      <div className="lesson-view-container">
        <Breadcrumb items={items} />
        {/* ------------------------------------------------------------- */}
        {/* LESSON HEADER */}
        {/* ------------------------------------------------------------- */}
        <div className="lesson-view-card">
          {/* <BackButton to={`/courses/${courseId}/add-content`} /> */}
          <h2 className="lesson-view-heading">{lessonData.name}</h2>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EXPANDED LESSON SECTION */}
        {/* ------------------------------------------------------------- */}
        <div className="lesson-view-details-card">
          {/* EDIT MODE */}
          {isEditingLesson ? (
            <>
              <p><strong>Name:</strong></p>
              <input
                className="lesson-view-edit-input"
                value={lessonData.name}
                onChange={(e) =>
                  setLessonData({ ...lessonData, name: e.target.value })
                }
              />

              <p><strong>Description:</strong></p>
              <textarea
                className="lesson-view-edit-input lesson-view-description-input"
                value={lessonData.description}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    description: e.target.value,
                  })
                }
              />
            </>
          ) : (
            <>
              <p><strong>Lesson Name:</strong> {lessonData.name}</p>
              <p className="lesson-view-description lesson-view-description-input">
                <strong>Description:</strong> {lessonData.description}
              </p>
            </>
          )}

          {/* BUTTONS */}
          <div className="lesson-view-edit-delete-row">
            <button className="lesson-view-edit-btn" onClick={handleLessonEdit}>
              {isEditingLesson ? (lessonSaving ? "Saving..." : "Save") : "Edit"}
            </button>

            {isEditingLesson ? (
              <button
                className="lesson-view-delete-btn"
                onClick={() => setIsEditingLesson(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="lesson-view-delete-btn"
                onClick={handleLessonDelete}
              >
                Delete
              </button>

            )}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* CONTENT LIST */}
          {/* ----------------------------------------------------------- */}
          <h4 className="lesson-view-content-heading">Contents</h4>

          {lessonData.contents.map((item) => (
            <div key={item.id} className="lesson-view-content-card">
              {/* TITLE */}
              <div
                className="lesson-view-content-title"
                onClick={() =>
                  setOpenContent(openContent === item.id ? null : item.id)
                }
              >
                <p>{item.type}</p>
                <span
                  className={`lesson-view-arrow ${openContent === item.id ? "open" : ""
                    }`}
                >
                  ▼
                </span>
              </div>

              {/* BODY */}
              {openContent === item.id && (
                <div className="lesson-view-content-details">
                  {/* ======================================================= */}
                  {/* EDIT MODE */}
                  {/* ======================================================= */}
                  {editingContentId === item.id ? (
                    <>
                      {/* PDF */}
                      {item.type === "PDF" && (
                        <>
                          <p><strong>Upload New PDF:</strong></p>
                          <input
                            type="file"
                            className="lesson-view-edit-input"
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, file: e.target.files[0] }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />
                        </>
                      )}

                      {/* WEBLINK */}
                      {item.type === "Weblink" && (
                        <>
                          <p><strong>Link URL:</strong></p>
                          <input
                            className="lesson-view-edit-input"
                            value={item.url}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, url: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />
                        </>
                      )}

                      {/* NOTE */}
                      {item.type === "Note" && (
                        <>
                          <p><strong>Edit Notes:</strong></p>
                          <div
                            ref={noteEditorRef}
                            className="lesson-view-note-editor"
                            contentEditable
                            suppressContentEditableWarning
                            dangerouslySetInnerHTML={{ __html: item.html }}
                          />
                        </>
                      )}

                      {/* QUIZ */}
                      {item.type === "Quiz" && (
                        <>
                          <p><strong>Name:</strong></p>
                          <input
                            className="lesson-view-edit-input"
                            value={item.name}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, name: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>Description:</strong></p>
                          <textarea
                            className="lesson-view-edit-input"
                            value={item.description}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, description: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>URL:</strong></p>
                          <input
                            className="lesson-view-edit-input"
                            value={item.url || ""}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, url: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>Upload File:</strong></p>
                          <input
                            type="file"
                            className="lesson-view-edit-input"
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, file: e.target.files[0] }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />
                        </>
                      )}

                      {/* LAB */}
                      {item.type === "Lab" && (
                        <>
                          <p><strong>Name:</strong></p>
                          <input
                            className="lesson-view-edit-input"
                            value={item.name}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, name: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>Description:</strong></p>
                          <textarea
                            className="lesson-view-edit-input"
                            value={item.description}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, description: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>URL:</strong></p>
                          <input
                            className="lesson-view-edit-input"
                            value={item.url || ""}
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, url: e.target.value }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />

                          <p><strong>Upload File:</strong></p>
                          <input
                            type="file"
                            className="lesson-view-edit-input"
                            onChange={(e) => {
                              const updated = lessonData.contents.map((c) =>
                                c.id === item.id
                                  ? { ...c, file: e.target.files[0] }
                                  : c
                              );
                              setLessonData({ ...lessonData, contents: updated });
                            }}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    // =======================================================
                    // VIEW MODE
                    // =======================================================
                    <>
                      {item.type === "Note" ? (
                        <>
                          <p><strong>Notes:</strong></p>
                          <div
                            className="lesson-view-note-html"
                            dangerouslySetInnerHTML={{ __html: item.html }}
                          />
                        </>
                      ) : item.type === "PDF" ? (
                        <>
                          <p><strong>PDF:</strong></p>
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noreferrer">
                              {item.url.split("/").pop()}
                            </a>
                          ) : (
                            <span>No file uploaded</span>
                          )}
                        </>
                      ) : item.type === "Weblink" ? (
                        <ClickableLink label="URL" value={item.url} />
                      ) : (
                        <>
                          <p><strong>Name:</strong> {item.name}</p>
                          <p><strong>Description:</strong> {item.description}</p>

                          {item.url && (
                            <ClickableLink label="URL" value={item.url} />
                          )}

                          {item.file && (
                            <ClickableLink label="File" value={item.file} />
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* ------------------------------------------------------ */}
                  {/* CONTENT BUTTONS */}
                  {/* ------------------------------------------------------ */}
                  <div className="lesson-view-edit-delete-row">
                    <button
                      className="lesson-view-edit-btn"
                      onClick={() => handleContentEdit(item)}
                    >
                      {editingContentId === item.id
                        ? contentSavingId === item.id
                          ? "Saving..."
                          : "Save"
                        : "Edit"}
                    </button>

                    {editingContentId === item.id ? (
                      <button
                        className="lesson-view-delete-btn"
                        onClick={() => setEditingContentId(null)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="lesson-view-delete-btn"
                        onClick={() => handleDelete(item)}
                      >
                        {contentDeletingId === item.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========================================================================
// EXPORT
// ========================================================================
export default LessonPreview;
