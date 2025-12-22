import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  fetchMeetingLink,
  editMeetingLink,
  resetState,
} from "../../../../features/instructor/scheduleClass/meetingLink/editMeetingLinkSlice";
import "../../../../styles/instructor/scheduleClass/meetingLink/EditMeetingLink.css";
import BackButton from "../../../../components/BackButton";
import Instructornavbar from "../../../../components/Instructornavbar";

const EditMeetingLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get course & batch from navigation
  const dispatch = useDispatch();

  const instructorId = Number(localStorage.getItem("instructorId"));

  const { meetingLink, status, error, success } = useSelector(
    (state) => state.editMeetingLink
  );

  const [meetingUrl, setMeetingUrl] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [batchId, setBatchId] = useState(null);
  const [message, setMessage] = useState(""); // Success or error message
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Fetch meeting link on mount
  useEffect(() => {
    if (id && instructorId) {
      dispatch(fetchMeetingLink({ meetingId: Number(id), instructorId }));
    }
  }, [dispatch, id, instructorId]);

  // Prefill form values
  useEffect(() => {
    if (meetingLink) {
      setMeetingUrl(meetingLink?.meeting_url || "");
      // Use location.state if present, otherwise fallback to meetingLink values
      setCourseId(location.state?.course_id || meetingLink?.course_id);
      setBatchId(location.state?.batch_id || meetingLink?.batch_id);
    }
  }, [meetingLink, location.state]);

  console.log("de", batchId, courseId);

  // Show success message and navigate back
  useEffect(() => {
    if (success) {
      setMessage("Meeting link updated successfully!");
      setMessageType("success");

      const timer = setTimeout(() => {
        setMessage("");
        dispatch(resetState());
        navigate(-1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  // Show error messages
  useEffect(() => {
    if (status === "failed" && error) {
      setMessage(error);
      setMessageType("error");

      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meetingUrl.trim()) {
      setMessage("Meeting URL cannot be empty.");
      setMessageType("error");
      return;
    }

    if (!courseId || !batchId) {
      setMessage("Invalid course or batch ID");
      setMessageType("error");
      return;
    }

    const payload = {
      instructor_id: instructorId,
      course_id: Number(courseId),
      batch_id: Number(batchId),
      meeting_url: meetingUrl.trim(),
    };

    console.log("Submitting payload:", payload);
    dispatch(editMeetingLink({ meetingId: Number(id), updatedData: payload }));
  };

  return (
    <div className="edit-meeting-container">
      <Instructornavbar />
      <BackButton className="edit-meeting-backhead-button" />
      <h3 className="edit-meeting-backhead-title">Edit Meeting Link</h3>

      {status === "loading" && <p>Loading...</p>}

      {message && (
        <p className={messageType === "success" ? "success" : "error"}>
          {message}
        </p>
      )}

      {meetingLink && (
        <form className="edit-meeting-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={meetingLink?.course_title || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Batch Name</label>
            <input type="text" value={meetingLink?.batch_name || ""} readOnly />
          </div>

          <div className="form-group">
            <label>Meeting Link</label>
            <input
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditMeetingLink;
