import React, { useEffect } from "react";
import "../../../styles/instructor/userManagement/StudentDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../../features/instructor/userManagement/studentDetailsSlice.js";
import Spinner from "../../../components/Spinner.jsx";
import BackButton from "../../../components/BackButton.jsx";

const StudentDetails = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();

  const { details, loading, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentDetails(studentId));
    }
  }, [studentId, dispatch]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="student-details-error-container">
        <p className="student-details-error-text">
          Error: {error.message || error}
        </p>
      </div>
    );
  }

  if (!details) return <p>No student details found</p>;

  return (
    <div className="student-details-wrap">
      {/* Header */}
      <div className="student-details-header">
        <BackButton to="/instructor/user-management" />
        <h2 className="student-details-title">
          Student Details
        </h2>
      </div>

      {/* Card */}
      <div className="student-details-card">
        <DetailRow label="ID" value={details.id} />
        <DetailRow label="Name" value={details.name} />
        <DetailRow label="Email" value={details.email} />
        <DetailRow
          label="Phone"
          value={details.phone_no || "N/A"}
        />
        <DetailRow
          label="Registered On"
          value={details.created_at || "N/A"}
        />
        <DetailRow
          label="Status"
          value={details.status || "N/A"}
        />
        <DetailRow
          label="Assigned Course"
          value={details.course || "N/A"}
        />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="student-details-row">
    <span className="student-details-label">
      {label}:
    </span>
    <span className="student-details-value">
      {value}
    </span>
  </div>
);

export default StudentDetails;
