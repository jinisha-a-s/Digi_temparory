import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/instructor/scheduleClass/ScheduleClass.css";
import Instructornavbar from "../../../components/Instructornavbar";
// import { useSelector } from "react-redux";

const ScheduleClass = () => {
  //   const { user } = useSelector((state) => state.auth);
  return (
    <div className="schedule-container-fluid p-0">
      <Instructornavbar />

      {/* Buttons Grid */}
      <div className="schedule-button-grid">
        {/* My Courses */}
        <Link to="/courses" className="text-decoration-none">
          <span className="schedule-btn-box">
            {/* <FaBook className="icon" /> */}
            <span className="schedule-btn-text">Schedule Class</span>
          </span>
        </Link>

        {/* My Profile */}
        <Link
          to="/instructor/schedule-class/:courseId"
          className="text-decoration-none"
        >
          <span className="schedule-btn-box">
            {/* <FaUser className="icon" /> */}
            <span className="schedule-btn-text">Update Calender</span>
          </span>
        </Link>

        {/* My Performance */}
        <Link to="/instructor/meeting-link" className="text-decoration-none">
          <span className="schedule-btn-box">
            <span className="schedule-btn-text">Add Meeting Link</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleClass;
