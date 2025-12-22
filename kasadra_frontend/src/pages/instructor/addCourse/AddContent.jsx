import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Instructornavbar from "../../../components/Instructornavbar";

import {
  fetchLessons,
  fetchBatches,
  deleteLesson,
  activateLesson,
  clearContentState,
} from "../../../features/instructor/addCourse/addContentSlice";

import "../../../styles/instructor/addCourse/AddContent.css";

const AddContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  const { lessons, batches, loading, error } = useSelector(
    (state) => state.addContent
  );

  const [lessonsState, setLessonsState] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  // -------------------------------------------------------
  // ⭐ RESET REDUX STATE WHEN SWITCHING COURSE
  // -------------------------------------------------------
  useEffect(() => {
    dispatch(clearContentState());
    setSelectedBatch("");
    setLessonsState([]);
  }, [courseId, dispatch]);

  // -------------------------------------------------------
  // Fetch batches for this course
  // -------------------------------------------------------
  useEffect(() => {
    if (courseId) {
      dispatch(fetchBatches(courseId));
    }
  }, [dispatch, courseId]);

  // -------------------------------------------------------
  // Coming back from AddLesson page with preselected batch
  // -------------------------------------------------------
  useEffect(() => {
    if (location.state?.batchId) {
      const batchId = location.state.batchId;
      setSelectedBatch(batchId);
      dispatch(fetchLessons(Number(batchId)));
    }

    if (location.state?.refresh && selectedBatch) {
      dispatch(fetchLessons(Number(selectedBatch)));

      navigate(location.pathname, {
        replace: true,
        state: { batchId: selectedBatch },
      });
    }
  }, [location.state, dispatch]);

  // -------------------------------------------------------
  // Fetch lessons whenever batch changes
  // -------------------------------------------------------
  useEffect(() => {
    if (selectedBatch) {
      dispatch(fetchLessons(Number(selectedBatch)));
    } else {
      setLessonsState([]);
    }
  }, [selectedBatch, dispatch]);

  // -------------------------------------------------------
  // Sync Redux → Local State
  // -------------------------------------------------------
  useEffect(() => {
    setLessonsState(lessons || []);
  }, [lessons]);

  // -------------------------------------------------------
  // Handlers
  // -------------------------------------------------------
  const handleBatchSelect = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleDelete = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      dispatch(deleteLesson(lessonId));
      setLessonsState((prev) => prev.filter((l) => l.lesson_id !== lessonId));
    }
  };

  const handleAdd = (lessonId) => {
    navigate(`/instructor/${courseId}/${lessonId}/lesson-content`);
  };

  const addNewLesson = () => {
    navigate(`/instructor/add-lesson/${courseId}`, {
      state: { batchId: selectedBatch || null },
    });
  };

  const handleView = (lessonId) => {
    navigate(`/instructor/lesson-view/${courseId}/${lessonId}`);
  };

  const handleToggle = async (lessonId) => {
    if (!selectedBatch) {
      alert("Please select a batch first!");
      return;
    }

    try {
      const resultAction = await dispatch(
        activateLesson({ lessonId, batchId: Number(selectedBatch) })
      );

      if (activateLesson.fulfilled.match(resultAction)) {
        setLessonsState((prev) =>
          prev.map((lesson) =>
            lesson.lesson_id === lessonId
              ? { ...lesson, is_active: !lesson.is_active }
              : lesson
          )
        );
      } else {
        alert("Failed to toggle lesson: " + resultAction.payload);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="addcontent-page">
      <div className="addcontent-navbar">
        <Instructornavbar />
      </div>

      <div className="addcontent-body">
        <div className="addcontent-wrapper">
          <div className="addcontent-header">
            <h2 className="addcontent-title">Lessons</h2>

            {/* Batch Dropdown */}
            <div
              className="addcontent-batch-select"
              style={{ marginBottom: "18px" }}
            >
              <label className="addcontent-batch-label">Select Batch: </label>
              <select
                value={selectedBatch}
                onChange={handleBatchSelect}
                className="addcontent-batch-dropdown"
              >
                <option value="">-- Choose Batch --</option>
                {batches?.map((batch) => (
                  <option
                    key={batch.batch_id}
                    value={batch.batch_id.toString()}
                  >
                    {batch.batch_name || "Unnamed Batch"}
                  </option>
                ))}
              </select>
            </div>

            <button className="addcontent-add-btn" onClick={addNewLesson}>
              + Add New Lesson
            </button>
          </div>

          {/* Lessons Table */}
          <div className="addcontent-table-container">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <table className="addcontent-table">
                <thead>
                  <tr>
                    <th>Lesson Name</th>
                    <th>Course Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {lessonsState?.length > 0 ? (
                    lessonsState.map((lesson) => (
                      <tr key={lesson.lesson_id}>
                        <td>{lesson.title}</td>
                        <td>{lesson.course_name}</td>

                        <td>
                          <button
                            onClick={() => handleToggle(lesson.lesson_id)}
                            className={`addcontent-action-btn ${
                              lesson.is_active ? "btn-active" : "btn-inactive"
                            }`}
                          >
                            {lesson.is_active ? "Activated" : "Activate"}
                          </button>
                        </td>

                        <td className="addcontent-action-buttons">
                          <button
                            onClick={() => handleAdd(lesson.lesson_id)}
                            className="addcontent-action-btn"
                          >
                            + Add
                          </button>

                          <button
                            onClick={() => handleView(lesson.lesson_id)}
                            className="addcontent-action-btn"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleDelete(lesson.lesson_id)}
                            className="addcontent-action-btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        {selectedBatch
                          ? "No lessons added yet"
                          : "Please select a batch"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
