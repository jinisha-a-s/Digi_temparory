import React, { useState, useMemo, useEffect } from "react";
import "../../../styles/instructor/userManagement/UserManagement.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/instructor/userManagement/allUserSlice";
import Spinner from "../../../components/Spinner";

export default function UserManagement() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: students, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredStudents = useMemo(() => {
    if (!debouncedQuery) return students;

    return students.filter(
      (student) =>
        student.name?.toLowerCase().includes(debouncedQuery) ||
        student.email?.toLowerCase().includes(debouncedQuery) ||
        String(student.id).includes(debouncedQuery)
    );
  }, [students, debouncedQuery]);

  return (
    <div className="um-wrap">
      {/* Header */}
      <div className="um-header">
        <h2 className="um-subtitle">Registered Students</h2>

        <div className="um-search-box">
          <input
            type="search"
            placeholder="Search by name, email or ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="um-card">
        {loading && <Spinner />}
        {error && <p className="um-error">{error}</p>}

        {!loading && !error && (
          <table className="um-custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Registered On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="um-empty">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="um-table-row">
                    <td>{student.id}</td>
                    <td>{student.name || "-"}</td>
                    <td>{student.email || "-"}</td>
                    <td>
                      {student.created_at
                        ? new Date(student.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="btn-action view"
                        onClick={() =>
                          navigate(
                            `/instructor/user-management/${student.id}`
                          )
                        }
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
  );
}
