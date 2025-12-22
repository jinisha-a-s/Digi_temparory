import React from "react";
// import Studentnavbar from "../components/Navbar/StudentNavbar";
import { Link } from "react-router-dom";
import { FaBook, FaUser, FaChartLine } from "react-icons/fa";
import "../../styles/student/StudenthomePage.css";
import Studentnavbar from "../../components/Studentnavbar";
import { useSelector } from "react-redux";

const StudenthomePage = () => {
  const { user } = useSelector((state) => state.auth);

  const studentId= localStorage.getItem("studentId");
  console.log('studentId:', studentId);
  
  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <Studentnavbar />

      {/* Welcome Text */}
      <div className="welcome-text">
        <h5>
          <span className="highlight">
            Welcome {user && user.name ? user.name : "Student"} !
          </span>
        </h5>
      </div>

      {/* Buttons Grid */}
      <div className="button-grid">
        {/* My Courses */}
        <Link to="/student/my-course" className="text-decoration-none">
          <span className="btn-box">
            <FaBook className="icon" />
            <span className="btn-text">My Courses</span>
          </span>
        </Link>

        {/* My Profile */}
        <Link to={`/student/profile/${studentId}`} className="text-decoration-none">
          <span className="btn-box">
            <FaUser className="icon" />
            <span className="btn-text">My Profile</span>
          </span>
        </Link>

        {/* My Performance */}
        {/* <Link to="/performance" className="text-decoration-none">
          <span className="btn-box">
            <FaChartLine className="icon" />
            <span className="btn-text">My Performance</span>
          </span>
        </Link> */}
      </div>
    </div>
  );
};

export default StudenthomePage;
