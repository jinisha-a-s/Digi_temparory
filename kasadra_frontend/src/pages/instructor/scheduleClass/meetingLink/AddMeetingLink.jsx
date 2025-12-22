import React, { useEffect, useState } from "react";
import "../../../../styles/instructor/scheduleClass/meetingLink/AddMeetingLink.css";
import Instructornavbar from "../../../../components/Instructornavbar";
import BackButton from "../../../../components/BackButton";

import { useDispatch, useSelector } from "react-redux";
import {
  loadCourses,
  loadBatches,
  clearBatches,
} from "../../../../features/instructor/scheduleClass/meetingLink/addMeetingLinkSlice";
import { saveMeetingLinkAPI } from "../../../../api/instructor/scheduleClass/meetingLink/addMeetingLinkAPI";

function AddMeetingLink() {
  const dispatch = useDispatch();

  const {
    courses,
    batches,
    loadingCourses,
    loadingBatches,
    errorCourses,
    errorBatches,
  } = useSelector((state) => state.addMeetingLink);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);

  const handleCourseChange = (e) => {
    const id = e.target.value;
    setSelectedCourse(id);
    setSelectedBatch("");
    dispatch(clearBatches());
    if (id) dispatch(loadBatches(id));
  };

  const retryCourses = () => dispatch(loadCourses());
  const retryBatches = () => dispatch(loadBatches(selectedCourse));

  const handleSave = async () => {
    if (!selectedCourse || !selectedBatch || !meetingLink) {
      alert("Please select course, batch, and enter meeting link");
      return;
    }

    try {
      setSaving(true);
      const instructor_id = localStorage.getItem("instructorId");
      const data = await saveMeetingLinkAPI({
        instructor_id,
        course_id: selectedCourse,
        batch_id: selectedBatch,
        meeting_url: meetingLink,
      });
      alert(`Meeting link saved for ${data.course_title} - ${data.batch_name}`);
      setMeetingLink("");
      setSelectedCourse("");
      setSelectedBatch("");
      dispatch(clearBatches());
    } catch (err) {
      alert("Failed to save meeting link. Try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-meeting-container">
      <Instructornavbar />
      <div className="add-meeting-link-back-btn">
        <BackButton />
        <h3>Add Meeting Link</h3>
      </div>

      <div className="add-meeting-box">
        {/* Course */}
        <div className="add-row-item">
          <label>Select Course</label>
          {loadingCourses ? (
            <p>Loading courses...</p>
          ) : errorCourses ? (
            <div className="error">
              <p>{errorCourses}</p>
              <button onClick={retryCourses}>Retry</button>
            </div>
          ) : (
            <select value={selectedCourse} onChange={handleCourseChange}>
              <option value="">-- Select Course --</option>
              {courses.length === 0 && (
                <option disabled>No courses available</option>
              )}
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Batch */}
        <div className="add-row-item">
          <label>Select Batch</label>
          {loadingBatches ? (
            <p>Loading batches...</p>
          ) : errorBatches ? (
            <div className="error">
              <p>{errorBatches}</p>
              <button onClick={retryBatches}>Retry</button>
            </div>
          ) : (
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              disabled={!selectedCourse || batches.length === 0}
            >
              <option value="">-- Select Batch --</option>
              {batches.length === 0 && selectedCourse && (
                <option disabled>No batches available</option>
              )}
              {batches.map((b) => (
                <option key={b.batch_id} value={b.batch_id}>
                  {b.batch_name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Meeting Link */}
        <div className="add-row-item">
          <label>Enter Meeting Link</label>
          <input
            type="text"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://zoom.us/..."
          />
        </div>
      </div>

      <div className="add-button-area">
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            setSelectedCourse("");
            setSelectedBatch("");
            setMeetingLink("");
            dispatch(clearBatches());
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default AddMeetingLink;
