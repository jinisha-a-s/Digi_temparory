import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft
} from "lucide-react";
import "../styles/components/StudentSidebar.css";

/* -----------------------------
   STATIC INSTRUCTOR MENU
   (Matches your routes exactly)
-------------------------------- */
const instructorMenu = [
  {
    id: "user-management",
    label: "User Management",
    route: "user-management"
  },
  {
    id: "add-course",
    label: "Add Course",
    route: "add-new-course"
  },
  {
    id: "our-course",
    label: "Our Course",
    route: "view-course"
  },
  {
    id: "assign-batch",
    label: "Assign Batch",
    route: "assign-batch",
    children: [
      {
        id: "create-new-batch",
        label: "Create Batch",
        route: "assign-batch/create-new-batch"
      },

    ]
  },
  {
    id: "schedule-class",
    label: "Schedule Class",
    route: "course/schedule",
  },
  {
    id: "update-calendar",
    label: "Update Calendar",
    route: "schedule-class/:courseId",
  },
  {
    id: "update-zoom",
    label: "Update Zoom Link",
    route: "meeting-link",
  },

  {
    id: "live-class",
    label: "Live Class Update",
    route: "live-student-activity"
  }
];

export default function InstructorSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const instructorName =
    localStorage.getItem("instructorName") || "Instructor";

  const [openMenuId, setOpenMenuId] = useState(null);

  /* --------------------------------
     AUTO-OPEN MENU BASED ON URL
  --------------------------------- */
  useEffect(() => {
    instructorMenu.forEach((menu) => {
      if (
        menu.children &&
        menu.children.some((child) =>
          location.pathname.includes(child.route)
        )
      ) {
        setOpenMenuId(menu.id);
      }
    });
  }, [location.pathname]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <aside
      className={`student-sidebar-container ${collapsed ? "student-sidebar-collapsed" : ""
        }`}
    >
      {/* ================= HEADER ================= */}
      <div className="student-sidebar-header">
        <button
          className="student-sidebar-back-btn"
          onClick={() => navigate("/instructor/home")}
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        {!collapsed && (
          <span
            className="student-sidebar-username"
            title={instructorName}
          >
            Hi, {instructorName}
          </span>
        )}

        <button
          className="student-sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* ================= MENU ================= */}
      <nav className="student-sidebar-menu">
        {instructorMenu.map((item) => {
          const isParentActive =
            item.route &&
            location.pathname.includes(item.route);

          return (
            <div key={item.id} className="student-sidebar-lesson">
              {/* MAIN ITEM */}
              <div
                className={`student-sidebar-lesson-title ${isParentActive ? "student-sidebar-lesson-title-active" : ""
                  }`}
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id); // expand/collapse
                    if (item.route) navigate(item.route); // navigate to parent route if defined
                  } else {
                    navigate(item.route);
                  }
                }}
              >

                {item.children && (
                  <ChevronRight
                    size={16}
                    className={`lesson-arrow ${openMenuId === item.id ? "expanded" : ""
                      }`}
                  />
                )}
                <span>{item.label}</span>
              </div>

              {/* SUB MENU */}
              {item.children && openMenuId === item.id && (
                <div className="student-sidebar-lesson-contents expanded">
                  {item.children.map((child) => {
                    const isChildActive =
                      location.pathname.includes(child.route);

                    return (
                      <div
                        key={child.id}
                        className={`student-sidebar-content-item ${isChildActive
                          ? "student-sidebar-content-item-active"
                          : ""
                          }`}
                        onClick={() => navigate(child.route)}
                      >
                        {child.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
