import React, { useEffect } from "react";
import "../../../../styles/student/myCourse/existingCourse/ZoomLinkPage.css";
import { FaLink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchZoomLink,
  resetZoomPage,
} from "../../../../features/student/myCourse/existingCourse/zoomLinkPageSlice";
import { useParams } from "react-router-dom";
import Studentnavbar from "../../../../components/Studentnavbar";
// import StudentSidebar from "../../../../components/StudentSidebar";

export default function ZoomLinkPage() {
  const dispatch = useDispatch();

  // ✅ Correct URL params
  const { courseId } = useParams();
  const studentId = Number(localStorage.getItem("studentId"));

  const { loading, meeting, error } = useSelector((state) => state.zoomLink);

  useEffect(() => {
    if (studentId && courseId) {
      // ✅ Correct API input
      dispatch(fetchZoomLink({ studentId, courseId }));
    }

    return () => dispatch(resetZoomPage());
  }, [dispatch, studentId, courseId]);

  return (
    <div className="zoom-navbar">
      <Studentnavbar />
      <div className="zoom-container-default-bg">
        {/* <StudentSidebar /> */}
        <div className="zoom-model-6-card">
          <h2 className="zoom-model-6-title">Live Class Zoom Link</h2>

          {loading && <p className="zoom-loading">Fetching meeting link...</p>}

          {error && (
            <p className="zoom-error">
              {typeof error === "string" ? error : error?.msg}
            </p>
          )}

          {meeting && (
            <div className="zoom-model-6-box">
              <label className="zoom-model-6-label">Meeting Link</label>

              <p className="zoom-model-6-link">
                <FaLink className="link-icon" />
                {meeting.meeting_url}
              </p>

              <button
                className="zoom-model-6-btn"
                onClick={() => window.open(meeting.meeting_url, "_blank")}
              >
                Join Meeting
              </button>
            </div>
          )}

          <p className="zoom-model-6-note">
            Please check your audio before joining.
          </p>
        </div>
      </div>
    </div>
  );
}
