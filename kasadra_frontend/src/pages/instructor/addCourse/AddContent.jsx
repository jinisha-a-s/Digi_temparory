import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLessons } from "../../../features/instructor/addCourse/addContentSlice";
import "../../../styles/instructor/addCourse/AddContent.css";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import Modal from "../../../components/Modal";
import LessonContent from "./LessonContent";
 
export default function AddContent() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
 
  const [showLessonPopup, setShowLessonPopup] = useState(false);
 
  const items = [
    { label: "Courses", path: "/instructor/view-course" },
    { label: "Lessons", path: "" },
  ];
 
  const { lessons, loading, error } = useSelector((state) => state.addContent);
 
  useEffect(() => {
    if (courseId) {
      dispatch(fetchLessons(courseId));
    }
  }, [courseId, dispatch]);
 
  return (
    <div className="add-content-page">
      <div className="add-content-container">
        <Breadcrumb items={items} />
 
        {/* HEADER */}
        <div className="add-content-header">
          <span className="subtitle">Lessons</span>
 
          <button
            className="add-content-add-btn"
            onClick={() => setShowLessonPopup(true)}
          >
            + Add New Lesson
          </button>
        </div>
 
        {/* TABLE */}
        <div className="add-content-wrapper">
          {error && <div className="add-content-error">{error}</div>}
 
          <table className="add-content-table">
            <thead className="add-content-thead">
              <tr>
                <th>Lesson Title</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
 
            <tbody>
              {!loading &&
                lessons.map((lesson) => (
                  <tr key={lesson.lesson_id} className="add-content-row">
                    <td>{lesson.title}</td>
                    <td>{lesson.created_at}</td>
 
                    <td>
                      <div className="add-content-actions">
                        <button className="add-content-btn add">
                          Add New Content
                        </button>
 
                        <button
                          className="add-content-btn view"
                          onClick={() =>
                            navigate(
                              `/instructor/lesson-view/${courseId}/${lesson.lesson_id}`
                            )
                          }
                        >
                          Edit Lesson Content
                        </button>
 
                        <button className="add-content-btn delete">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
 
              {!loading && lessons.length === 0 && (
                <tr>
                  <td colSpan="4" className="add-content-empty">
                    No lessons found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* ================= MODAL ================= */}
      <Modal isOpen={showLessonPopup} onClose={() => setShowLessonPopup(false)}>
        <LessonContent
          courseId={courseId}
          onClose={() => setShowLessonPopup(false)}
          // 🔧 FIXED: removed batchId={selectedBatch} (it was undefined)
        />
      </Modal>
    </div>
  );
}
 
 