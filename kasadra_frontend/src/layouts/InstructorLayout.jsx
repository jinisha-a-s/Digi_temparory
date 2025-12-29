import { useState } from "react";
import { Outlet } from "react-router-dom";
import InstructorSidebar from "../components/InstructorSidebar";
import Instructornavbar from "../components/Instructornavbar";
import "../styles/layouts/InstructorLayout.css";

export default function InstructorLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="instructor-layout">
      <InstructorSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="instructor-main">
        <Instructornavbar />
        <Outlet />
      </div>
    </div>
  );
}
