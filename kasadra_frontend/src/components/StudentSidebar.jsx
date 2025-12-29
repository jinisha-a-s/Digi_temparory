import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Video,
  ArrowLeft
} from "lucide-react";
import "../styles/components/StudentSidebar.css";

const lessons = [
  { id: "1", title: "Lesson 1", contents: [{ type: "pdf", label: " PDF" }, { type: "notes", label: "Notes" }, { type: "quiz", label: "Quiz" }, { type: "lab", label: "Lab" }] },
  { id: "2", title: "Lesson 2", contents: [{ type: "pdf", label: " PDF" }, { type: "weblink", label: "Web Link" }, { type: "lab", label: "Lab" }] },
  { id: "3", title: "Lesson 3", contents: [{ type: "pdf", label: " PDF" }] },
  { id: "4", title: "Lesson 4", contents: [{ type: "pdf", label: " PDF" }, { type: "quiz", label: "Quiz" }, { type: "lab", label: "Lab" }] },
  { id: "5", title: "Lesson 5", contents: [{ type: "pdf", label: " PDF" }, { type: "weblink", label: "Web Link" }, { type: "lab", label: "Lab" }] },
  { id: "6", title: "Lesson 6", contents: [{ type: "pdf", label: " PDF" }] },
  { id: "7", title: "Lesson 7", contents: [{ type: "pdf", label: " PDF" }, { type: "quiz", label: "Quiz" }, { type: "lab", label: "Lab" }] },
  { id: "8", title: "Lesson 8", contents: [{ type: "pdf", label: " PDF" }, { type: "notes", label: "Notes" }, { type: "weblink", label: "Web Link" }, { type: "lab", label: "Lab" }] },
  { id: "9", title: "Lesson 9", contents: [{ type: "pdf", label: " PDF" }] },
  { id: "10", title: "Lesson 10", contents: [{ type: "pdf", label: " PDF" }, { type: "quiz", label: "Quiz" }, { type: "lab", label: "Lab" }] },
  { id: "11", title: "Lesson 11", contents: [{ type: "pdf", label: " PDF" }, { type: "weblink", label: "Web Link" }, { type: "lab", label: "Lab" }] },
  { id: "12", title: "Lesson 12", contents: [{ type: "pdf", label: " PDF" }] },
];

export default function StudentSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("studentName") || "Student";

  const [openLessonId, setOpenLessonId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeContentType, setActiveContentType] = useState(null);

  const toggleLesson = (lessonId) => {
    setOpenLessonId(openLessonId === lessonId ? null : lessonId);
  };

  return (
    <aside className={`student-sidebar-container ${collapsed ? "student-sidebar-collapsed" : ""}`}>

      {/* HEADER */}
      <div className="student-sidebar-header">
        <button
          className="student-sidebar-back-btn"
          onClick={() => navigate("/student/my-course")}
          title="Back to My Courses"
        >
          <ArrowLeft size={18} />
        </button>

        {!collapsed && <span className="student-sidebar-username" title={userName}>Hi, {userName}</span>}

        <button
          className="student-sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* MENU */}
      <nav className="student-sidebar-menu">
        <SidebarItem to="calendar" icon={<Calendar size={18} />} label="Calendar" collapsed={collapsed} />
        <SidebarItem to="zoom" icon={<Video size={18} />} label="Zoom Link" collapsed={collapsed} />

        <div className="student-sidebar-lessons">
          {!collapsed &&
            lessons.map((lesson) => (
              <div key={lesson.id} className="student-sidebar-lesson">

                {/* Lesson title */}
                <div
                  className={`student-sidebar-lesson-title ${activeLessonId === lesson.id ? 'student-sidebar-lesson-title-active' : ''}`}
                  onClick={() => {
                    toggleLesson(lesson.id);
                    navigate(`lesson/${lesson.id}`);
                    setActiveLessonId(lesson.id);
                    setActiveContentType(null);
                  }}
                >
                  <ChevronRight
                    size={16}
                    className={`lesson-arrow ${openLessonId === lesson.id ? "expanded" : ""}`}
                  />
                  <span>{lesson.title}</span>
                </div>

                {/* Lesson contents */}
                {openLessonId === lesson.id && (
                  <div className={`student-sidebar-lesson-contents expanded`}>
                    {lesson.contents.map((content) => (
                      <div
                        key={content.type}
                        className={`student-sidebar-content-item ${activeLessonId === lesson.id && activeContentType === content.type ? 'student-sidebar-content-item-active' : ''}`}
                        onClick={() => {
                          navigate(`lesson/${lesson.id}/${content.type}`);
                          setActiveLessonId(lesson.id);
                          setActiveContentType(content.type);
                        }}
                      >
                        {content.label}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
        </div>

      </nav>
    </aside>
  );
}

function SidebarItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `student-sidebar-item ${isActive ? "student-sidebar-active" : ""}`
      }
    >
      <span className="student-sidebar-icon">{icon}</span>
      {!collapsed && <span className="student-sidebar-label">{label}</span>}
    </NavLink>
  );
}
