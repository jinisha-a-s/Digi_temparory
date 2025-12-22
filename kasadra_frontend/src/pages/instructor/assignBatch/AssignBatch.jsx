import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice.js";
import {
    fetchBatches,
    fetchStudentsByCourse,
    clearBatches,
    setSelectedCourse
} from "../../../features/instructor/assignBatch/assignBatchSlice.js";

import "../../../styles/instructor/assignBatch/AssignBatch.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import InstructorhomePage from "../InstructorhomePage.jsx";

const AssignBatchTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { courses } = useSelector((state) => state.course);
    const { batches, students, selectedCourseId } = useSelector((state) => state.batches);

    const [selectedCourse, setSelectedCourseState] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    // NEW
    const [hasAssignedSelected, setHasAssignedSelected] = useState(false);

    // -----------------------------------------------
    // Load instructor courses ONLY once
    // -----------------------------------------------
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(fetchInstructorCourses());
        }
    }, [courses.length, dispatch]);

    // -----------------------------------------------
    // Correct & FINAL course-change effect
    // -----------------------------------------------
    useEffect(() => {
        if (!selectedCourse) {
            dispatch(clearBatches());
            return;
        }

        dispatch(clearBatches());
        dispatch(fetchBatches(selectedCourse));
        dispatch(fetchStudentsByCourse(selectedCourse));
    }, [selectedCourse, dispatch]);

    // -----------------------------------------------
    // Restore previous state when user returns
    // -----------------------------------------------
    useEffect(() => {
        if (!selectedCourse && selectedCourseId) {
            setSelectedCourseState(selectedCourseId);

            dispatch(clearBatches()); // ⭐ FIX ADDED HERE

            dispatch(fetchStudentsByCourse(selectedCourseId));
            dispatch(fetchBatches(selectedCourseId));
        }
    }, [dispatch, selectedCourse, selectedCourseId]);


    // -----------------------------------------------
    // CHECK SELECTED STUDENTS — Assigned or not?
    // -----------------------------------------------
    useEffect(() => {
        const foundAssigned = selectedStudents.some((sid) => {
            const st = students.find((s) => s.student_id === sid);
            return st && st.batch_name && st.batch_name !== "null";
        });

        setHasAssignedSelected(foundAssigned);
    }, [selectedStudents, students]);

    // -----------------------------------------------
    // Reset selections when course changes
    // -----------------------------------------------
    useEffect(() => {
        setSelectedStudents([]);
        setHasAssignedSelected(false);
    }, [selectedCourse]);

    // -----------------------------------------------
    // Handlers
    // -----------------------------------------------
    const handleCourseChange = (e) => {
        const cid = e.target.value;

        setSelectedCourseState(cid);
        dispatch(setSelectedCourse(cid)); // sync with redux
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    // ----------------------------
    // COMMAND: compute filtered students once for clarity
    // ----------------------------
    const filteredStudents = students
        .filter((student) => {
            if (searchText.trim() !== "") {
                if (!student.name.toLowerCase().includes(searchText.toLowerCase())) {
                    return false;
                }
            }

            if (selectedBatch === "All") return true;

            if (selectedBatch === "Unassigned") {
                return (
                    !student.batch_name ||
                    student.batch_name === "null"
                );
            }

            return student.batch_name === selectedBatch;
        });

    // ----------------------------
    // COMMAND: helper to decide which "no-data" message to show
    // ----------------------------
    const getNoDataMessage = () => {
        if (!selectedCourse) return "📘 Please select the course first";
        if (students.length === 0) return "No students found for this course.";
        if (filteredStudents.length === 0) {
            return searchText.trim() !== "" ? "No matching students found." : "No students match the selected filters.";
        }
        return null;
    };

    const noDataMessage = getNoDataMessage();

    return (
        <div className="assign-batch-instructor-home">
            <InstructorhomePage />
            <div className="assign-batch-wrap">
                <Instructornavbar />

                <div className="assign-batch-page">
                    {/* Header Section */}
                    <div className="assign-batch-all-header">
                        <div className="assign-batch-header-left">
                            <BackButton to="/instructor/home" />
                            <div className="assign-batch-header">
                                <p className="assign-batch-title">Assign Students to Batches</p>
                            </div>
                        </div>

                        {/* Filters Row */}
                        <div className="assign-batch-controls">
                            {/* Search Box */}
                            <div className="assign-batch-search-box">
                                <input
                                    type="text"
                                    className={`assign-batch-search-input ${searchOpen ? "open" : ""}`}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search students..."
                                    // COMMAND: basic aria label for accessibility
                                    aria-label="Search students"
                                />

                                <button
                                    type="button"
                                    className="assign-batch-search-btn"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    title="Open/close search"
                                >
                                    🔍
                                </button>
                            </div>

                            {/* Course Dropdown */}
                            <div className="assign-batch-control-item">
                                <label>
                                    Select Course
                                    {/* COMMAND: small info tooltip beside label */}
                                    <span className="info-icon" title="Select a course to load students and batches."> ⓘ</span>
                                </label>
                                <select
                                    value={selectedCourse}
                                    onChange={handleCourseChange}
                                    className="assign-batch-select"
                                >
                                    <option value="">Select the Course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Batch Dropdown */}
                            <div className="assign-batch-control-item">
                                <label>
                                    Select Batch
                                    <span className="info-icon" title="Filter students by batch (All / Unassigned / specific batch)."> ⓘ</span>
                                </label>
                                <select
                                    value={selectedBatch}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                    disabled={!selectedCourse}
                                    className="assign-batch-select"
                                >
                                    <option value="All">All</option>
                                    <option value="Unassigned">Unassigned</option>

                                    {batches.map((b) => (
                                        <option key={b.batch_id} value={b.batch_name}>
                                            {b.batch_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="assign-batch-body">
                        <div className="assign-batch-card">
                            <div className="assign-batch-table-wrapper">
                                <table className="assign-batch-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Current Batch</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* COMMAND: show friendly message inside table when there's no course selected OR no students after filtering */}
                                        {noDataMessage ? (
                                            <tr className="empty-table-row">
                                                {/* colspan=4 to center message across table */}
                                                <td colSpan={4} className="empty-table-cell">
                                                    {noDataMessage}
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredStudents.map((student) => {
                                                const isSelected = selectedStudents.includes(student.student_id);
                                                const isAssigned = student.batch_name && student.batch_name !== "null";

                                                return (
                                                    // COMMAND: add row highlight when selected
                                                    <tr
                                                        key={student.student_id}
                                                        className={isSelected ? "selected-row" : ""}
                                                    >
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={() => toggleStudentSelection(student.student_id)}
                                                                aria-label={`select ${student.name}`}
                                                            />
                                                        </td>

                                                        <td>{student.name}</td>
                                                        <td>{student.batch_name || "Unassigned"}</td>

                                                        {/* COMMAND: Fixed invalid nested <td> structure by using a single td for actions */}
                                                        <td>
                                                            <button
                                                                className={isAssigned ? "move-btn" : "assign-btn"}
                                                                onClick={() => {
                                                                    navigate("/instructor/assign-batch/select", {
                                                                        state: {
                                                                            selectedStudents: [student.student_id],
                                                                            courseId: selectedCourse,
                                                                            mode: isAssigned ? "move" : "assign",
                                                                        },
                                                                    });
                                                                }}
                                                                title={isAssigned ? "Move this student to another batch" : "Assign this student to a batch"}
                                                            >
                                                                {isAssigned ? "Move" : "Assign"}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="assign-batch-buttons">
                            <button
                                className="assign-batch-btn"
                                disabled={hasAssignedSelected || selectedStudents.length === 0}
                                style={{
                                    opacity: hasAssignedSelected ? 0.4 : 1,
                                    cursor: hasAssignedSelected ? "not-allowed" : "pointer",
                                }}
                                onClick={() => {
                                    if (hasAssignedSelected) {
                                        alert("⚠️ Please select only unassigned students to assign.");
                                        return;
                                    }

                                    navigate("/instructor/assign-batch/select", {
                                        state: {
                                            selectedStudents,
                                            courseId: selectedCourse,
                                        },
                                    });
                                }}
                                // COMMAND: tooltip explaining why disabled when applicable
                                title={hasAssignedSelected ? "Select only unassigned students to use Assign" : (selectedStudents.length === 0 ? "Select students to assign" : "Assign selected students")}
                            >
                                Assign to
                            </button>

                            <button
                                className="assign-batch-btn-move"
                                disabled={!hasAssignedSelected || selectedStudents.length === 0}
                                style={{
                                    opacity: !hasAssignedSelected ? 0.4 : 1,
                                    cursor: !hasAssignedSelected ? "not-allowed" : "pointer",
                                }}
                                onClick={() => {
                                    if (!hasAssignedSelected) {
                                        alert("Please select only assigned students to move.");
                                        return;
                                    }

                                    navigate("/instructor/assign-batch/select", {
                                        state: {
                                            selectedStudents,
                                            courseId: selectedCourse,
                                            mode: "move",
                                        },
                                    });
                                }}
                                title={!hasAssignedSelected ? "Select only assigned students to use Move" : (selectedStudents.length === 0 ? "Select students to move" : "Move selected students")}
                            >
                                Move To
                            </button>

                            <button
                                className="assign-batch-btn-create"
                                onClick={() => navigate("/instructor/assign-batch/create-new-batch")}
                                title="Create a new batch for this course"
                            >
                                ➕ Create New Batch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignBatchTable;
