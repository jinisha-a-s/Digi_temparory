import React from "react";

import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/InstructorSidebar.css";

const InstructorSidebar = ({ active, courseId }) => {
  // ✅ destructure courseId

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Lesson",
      icon: "bi-book",
      path: `/instructor/add-lesson/${courseId}`,
    },
    {
      name: "Concept",
      icon: "bi-layers",
      path: `/instructor/add-concept/${courseId}`,
    },
    {
      name: "Quiz",
      icon: "bi-file-text",
      path: `/instructor/add-quiz/${courseId}`,
    },
    { name: "Lab", icon: "bi-beaker", path: `/instructor/add-lab/${courseId}` },
  ];

  return (
    <div className="instructor-sidebar">
      {menuItems.map((item) => (
        <button
          key={item.name}
          className={`instructor-sidebar-item ${
            active === item.name ? "active" : ""
          }`}
          onClick={() => navigate(item.path)}
        >
          <i className={`bi ${item.icon} me-2`}></i>
          {item.name}
        </button>
      ))}

      <div className="instructor-sidebar-back">
        <BackButton to={`/courses/${courseId}/add-content`} />
      </div>
    </div>
  );
};

export default InstructorSidebar;
