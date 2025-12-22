

// import React, { useEffect } from "react";
// import Instructornavbar from "../../components/Instructornavbar";
// import {
//   FaUsers,
//   FaBook,
//   FaChalkboardTeacher,
//   FaBroadcastTower,
//   FaRegCalendarAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchInstructorProfile } from "../../features/auth/instructorProfileslice.js";
// import "../../styles/instructor/Instructorhome.css";

// const InstructorhomePage = () => {
//   const dispatch = useDispatch();

//   // ✅ Get instructor from Redux store
//   const { profile: instructor, loading, error } = useSelector(
//     (state) => state.instructorProfile
//   );

//   useEffect(() => {
//     dispatch(fetchInstructorProfile());
//   }, [dispatch]);

//   //   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error {error}</p>;

//   console.log(instructor);


//   return (
//     <div>
//       <Instructornavbar />
//       <div className="containers">
//         <h3>Welcome!</h3>
//         <p className="instructor-profile-name" style={{ color: "black" }}>
//           {" "}
//           {instructor?.name}
//         </p>

//         <div className="card-grid">
//           <Link to="/instructor/user-management" className="card">
//             <FaUsers className="card-icon" />
//             <span>User Management</span>
//           </Link>

//           <Link to="/add-new-course" className="card">
//             <FaBook className="card-icon" />
//             <span>Add Course</span>
//           </Link>

          
//           <Link to="/instructor/view-course" className="card">
//             <FaBook className="card-icon" />
//             <span>View Course</span>
//           </Link>

//           <Link to="/instructor/assign-batch" className="card">
//             <FaChalkboardTeacher className="card-icon" />
//             <span>Assign Batch</span>
//           </Link>

//           <Link to="/instructor/live-student-activity" className="card">
//             <FaBroadcastTower className="card-icon" />
//             <span>Live Class Update</span>
//           </Link>

//           <Link to="/instructor/schedule-class" className="card">
//             <FaRegCalendarAlt className="card-icon" />
//             <span>Schedule Class</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorhomePage;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaBroadcastTower,
  FaRegCalendarAlt,
  FaBars,
} from "react-icons/fa";

import Instructornavbar from "../../components/Instructornavbar";
import { fetchInstructorProfile } from "../../features/auth/instructorProfileslice.js";
import "../../styles/instructor/Instructorhome.css";

const InstructorhomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapsed state
  const [scheduleOpen, setScheduleOpen] = useState(false);


  const { profile: instructor, loading, error } = useSelector(
    (state) => state.instructorProfile
  );

  useEffect(() => {
    dispatch(fetchInstructorProfile());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="instructor-home-container">
      <Instructornavbar />

      <div className={`instructor-sidebar-layout ${collapsed ? "collapsed" : ""}`}>
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h4>{!collapsed ? `Welcome, ${instructor?.name}` : "👋"}</h4>
            <button className="collapse-btn" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </div>

          <nav className="sidebar-nav">
            <Link
              to="/instructor/user-management"
              className={location.pathname === "/instructor/user-management" ? "active" : ""}
            >
              <FaUsers />
              {!collapsed && <span>User Management</span>}
            </Link>

            <Link
              to="/add-new-course"
              className={location.pathname === "/add-new-course" ? "active" : ""}
            >
              <FaBook />
              {!collapsed && <span>Add Course</span>}
            </Link>
            <Link
              to="/instructor/view-course"
              className={location.pathname === "/instructor/view-course" ? "active" : ""}
            >
              <FaBook />
              {!collapsed && <span>View Course</span>}
            </Link>

            <Link
              to="/instructor/assign-batch"
              className={location.pathname === "/instructor/assign-batch" ? "active" : ""}
            >
              <FaChalkboardTeacher />
              {!collapsed && <span>Assign Batch</span>}
            </Link>

            <Link
              to="/instructor/live-student-activity"
              className={location.pathname === "/instructor/live-student-activity" ? "active" : ""}
            >
              <FaBroadcastTower />
              {!collapsed && <span>Live Class Update</span>}
            </Link>

            <div className={`sidebar-dropdown ${scheduleOpen ? "open" : ""}`}>
              <div
                className="dropdown-header"
                onClick={() => setScheduleOpen(!scheduleOpen)}
              >
                <FaRegCalendarAlt />
                {!collapsed && <span>Schedule Class</span>}
              </div>

              {!collapsed && scheduleOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/instructor/schedule-class/calendar"
                    className={location.pathname.includes("/calendar") ? "active" : ""}
                  >
                    📅 Calendar Update
                  </Link>

                  <Link
                    to="/instructor/meeting-link"
                    className={location.pathname.includes("/meeting-link") ? "active" : ""}
                  >
                    🔗 Meeting Link
                  </Link>
                </div>
              )}
            </div>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2>Instructor Dashboard</h2>
          <p>Use the sidebar to navigate between sections.</p>
        </main>
      </div>
    </div>
  );
};

export default InstructorhomePage;
