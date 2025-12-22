import React, { useEffect } from "react";
import "../../../../styles/instructor/scheduleClass/meetingLink/MeetingLink.css";
import Instructornavbar from "../../../../components/Instructornavbar";
import BackButton from "../../../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  fetchMeetingLinks,
  deleteMeetingLink,
} from "../../../../features/instructor/scheduleClass/meetingLink/meetingLinkSlice";

const MeetingLink = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instructorId = localStorage.getItem("instructorId");

  const meetingLinkState = useSelector(
    (state) => state.meetingLink,
    shallowEqual
  );

  const data = meetingLinkState?.data || [];
  const status = meetingLinkState?.status || "idle";
  const error = meetingLinkState?.error || null;

  useEffect(() => {
    if (instructorId) {
      dispatch(fetchMeetingLinks(instructorId));
    }
  }, [dispatch, instructorId]);

  const goToEditPage = (item) => {
    navigate(`/instructor/edit-meeting-link/${item.id}`, {
      state: { course_id: item.course_id, batch_id: item.batch_id },
    });
  };

  const goToAddPage = () => {
    navigate("/instructor/add-meeting-link");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this meeting link?")) {
      dispatch(deleteMeetingLink(id));
    }
  };

  return (
    <div className="zoom-table-container">
      <Instructornavbar />
      <div className="meeting-link-back-btn">
        <BackButton />
        <div className="meeting-link-heading">
          <h1>Meeting Link</h1>
        </div>
      </div>

      {status === "loading" && <p className="loading">Loading...</p>}
      {status === "failed" && (
        <p className="error">
          {error || "Something went wrong while fetching meeting links."}
        </p>
      )}
      {status === "succeeded" && data.length === 0 && (
        <p className="no-data">No Meeting Links</p>
      )}

      {status === "succeeded" && data.length > 0 && (
        <table className="zoom-table">
          <thead>
            <tr>
              <th>Meeting Link</th>
              <th>Course name</th>
              <th>Batch name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="link-col">
                  <a
                    href={item.meeting_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.meeting_url}
                  </a>
                </td>
                <td>{item.course_title}</td>
                <td>{item.batch_name}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => goToEditPage(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="add-btn-area">
        <button className="add-btn" onClick={goToAddPage}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default MeetingLink;
