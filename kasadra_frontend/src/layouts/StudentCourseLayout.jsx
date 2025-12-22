import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import "../styles/layouts/StudentCourseLayout.css";

export default function StudentCourseLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="student-course-layout">
      <StudentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`student-course-content ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
