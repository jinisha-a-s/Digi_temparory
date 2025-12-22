import React, { useEffect } from "react";
import "../../../styles/instructor/userManagement/StudentDetails.css";
import Instructornavbar from "../../../components/Instructornavbar.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../../features/instructor/userManagement/studentDetailsSlice.js";
import Spinner from "../../../components/Spinner.jsx";
import BackButton from "../../../components/BackButton.jsx";


const StudentDetails = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentDetails(studentId));
      // const timer = setTimeout(() => {
      //   dispatch(fetchStudentDetails(studentId));
      // }, 9000);
      // return () => clearTimeout(timer);
    }
  }, [studentId, dispatch]);

  if (loading) return <Spinner data-testid="loading-spinner" />;

  // if (error) return <p className="student-details-error-text">Error: {error.message || error}</p>;

  if (error)
    return (
      <div className="student-details-error-container">
        <p className="student-details-error-text">Error: {error.message || error}</p>
      </div>
    );


  if (!details) return <p>No student details found</p>;



  return (
    <div className="student-details-container">
      <Instructornavbar data-testid="instructor-navbar" />
      <div className="student-details-body">
        <div className="student-details-main-header">
          <BackButton className="student-details-close-button" to="/instructor/user-management" />
          <h2 className="student-details-title">Student Details</h2>

        </div>

        <div className="student-details-card">
          <div className="student-details-card-body">
            <div className="student-details-row">
              <span className="student-details-label">ID:</span>
              <span className="student-details-value" data-testid="student-id">{details.id}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Name:</span>
              <span className="student-details-value" data-testid="student-name">{details.name}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Email:</span>
              <span className="student-details-value" data-testid="student-email">{details.email}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Phone:</span>
              <span className="student-details-value" data-testid="student-phone">{details.phone_no || "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Registered on:</span>
              <span className="student-details-value" data-testid="student-created">{details.created_at || "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Status:</span>
              <span className="student-details-value" data-testid="student-status">{details.status || "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Assigned Course:</span>
              <span className="student-details-value" data-testid="student-course">{details.course || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
