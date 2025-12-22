import React, { useState, useMemo, useEffect } from "react";
import Instructornavbar from "../../../components/Instructornavbar.jsx";
import "../../../styles/instructor/userManagement/UserManagement.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/instructor/userManagement/allUserSlice";
import Spinner from "../../../components/Spinner";
import BackButton from "../../../components/BackButton";
import InstructorhomePage from "../InstructorhomePage.jsx";

const STATUS_OPTIONS = ["All", "Newly Registered", "Ongoing", "Finished", "Discontinued"];

const getStatusClass = (status) => {
  const map = {
    "Newly Registered": "um-status newly",
    "Ongoing": "um-status ongoing",
    "Finished": "um-status finished",
    "Discontinued": "um-status discontinued",
  };
  return map[status] || "status";
};

export default function UserManagement() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: students, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);


  console.log('user management');


  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (selectedFilter !== "All" && student.status !== selectedFilter) return false;

      if (!debouncedQuery) return true;

      return (
        student.name?.toLowerCase().includes(debouncedQuery) ||
        student.email?.toLowerCase().includes(debouncedQuery) ||
        String(student.id)?.toLowerCase().includes(debouncedQuery)
      );
    });
  }, [students, selectedFilter, debouncedQuery]);

  return (
    <div className="um-main-container">
      <div className="instructor-home"><InstructorhomePage /></div>
      <div className="um-wrap" data-testid="user-management-page">
        <Instructornavbar data-testid="instructor-navbar" />

        <div className="um-header">
          <div className="um-title">
            <BackButton to="/instructor/home" />
            <p className="um-subtitle" data-testid="page-title">Registered Students</p>
          </div>

          <div className="um-controls">
            <label className="um-filter-label" data-testid="filter-label">
              Filter
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="um-filter-select"
                data-testid="filter-select"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} data-testid={`filter-option-${opt}`}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <div className="um-search-box" data-testid="search-box">
              <input
                type="search"
                placeholder="Search by name, email or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="search-input"
              />
            </div>
          </div>
        </div>

        <div className="um-card" data-testid="um-card">
          {loading && <Spinner data-testid="loading-spinner" />}
          {error && <p className="um-error" data-testid="error-message">{error}</p>}

          {!loading && !error && (
            <table className="um-custom-table" data-testid="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Registered On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody data-testid="students-tbody">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="um-empty" data-testid="empty-state">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="um-table-row" data-testid={`student-row-${student.id}`}>
                      <td data-testid={`student-id-${student.id}`}>{student.id}</td>
                      <td data-testid={`student-name-${student.id}`}>{student.name || "-"}</td>
                      <td data-testid={`student-email-${student.id}`}>{student.email || "-"}</td>
                      <td data-testid={`student-course-${student.id}`}>{student.course || "-"}</td>
                      <td data-testid={`student-date-${student.id}`}>
                        {student.created_at ? new Date(student.created_at).toLocaleDateString() : "-"}
                      </td>
                      <td data-testid={`student-status-${student.id}`}>
                        <span className={getStatusClass(student.status || "N/A")}>
                          {student.status || "N/A"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-action view"
                          onClick={() => navigate(`/instructor/user-management/${student.id}`)}
                          data-testid={`view-button-${student.id}`}
                        >

                          View
                        </button>



                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
