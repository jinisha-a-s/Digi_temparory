import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  fetchMeetingLink,
  editMeetingLink,
  resetState,
} from "../../../../features/instructor/scheduleClass/meetingLink/editMeetingLinkSlice";
import "../../../../styles/instructor/scheduleClass/meetingLink/EditMeetingLink.css";

const EditMeetingLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const instructorId = Number(localStorage.getItem("instructorId"));

  const { meetingLink, status, error, success } = useSelector(
    (state) => state.editMeetingLink
  );

  const [meetingUrl, setMeetingUrl] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [batchId, setBatchId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (id && instructorId) {
      dispatch(fetchMeetingLink({ meetingId: Number(id), instructorId }));
    }
  }, [dispatch, id, instructorId]);

  useEffect(() => {
    if (meetingLink) {
      setMeetingUrl(meetingLink.meeting_url || "");
      setCourseId(location.state?.course_id || meetingLink.course_id);
      setBatchId(location.state?.batch_id || meetingLink.batch_id);
    }
  }, [meetingLink, location.state]);

  useEffect(() => {
    if (success) {
      setMessage("Meeting link updated successfully!");
      setMessageType("success");

      const timer = setTimeout(() => {
        dispatch(resetState());
        navigate(-1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      setMessage(error);
      setMessageType("error");
    }
  }, [status, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!meetingUrl.trim()) {
      setMessage("Meeting URL cannot be empty.");
      setMessageType("error");
      return;
    }

    const payload = {
      instructor_id: instructorId,
      course_id: Number(courseId),
      batch_id: Number(batchId),
      meeting_url: meetingUrl.trim(),
    };

    dispatch(editMeetingLink({ meetingId: Number(id), updatedData: payload }));
  };

  return (
    <>
      <div className="edit-meeting-container">

        <h2 className="edit-meeting-title">Edit Meeting Link</h2>

        <form className="edit-meeting-form" onSubmit={handleSubmit}>
          {message && (
            <p
              className={
                messageType === "success"
                  ? "edit-meeting-success"
                  : "edit-meeting-error"
              }
            >
              {message}
            </p>
          )}

          <div className="edit-meeting-group">
            <label>Course Name</label>
            <input
              type="text"
              value={meetingLink?.course_title || ""}
              readOnly
            />
          </div>

          <div className="edit-meeting-group">
            <label>Batch Name</label>
            <input
              type="text"
              value={meetingLink?.batch_name || ""}
              readOnly
            />
          </div>

          <div className="edit-meeting-group">
            <label>Meeting Link</label>
            <input
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              placeholder="https://zoom.us/..."
              required
            />
          </div>

          <div className="edit-meeting-buttons">
            <button
              type="submit"
              className="edit-meeting-btn edit-meeting-save-btn"
              disabled={status === "loading"}
            >
              Update
            </button>

            <button
              type="button"
              className="edit-meeting-btn edit-meeting-cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMeetingLink;
