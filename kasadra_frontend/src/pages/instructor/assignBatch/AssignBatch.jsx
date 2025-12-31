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
import SelectBatch from "./SelectBatch.jsx";


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
    const [hasAssignedSelected, setHasAssignedSelected] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [popupStudents, setPopupStudents] = useState([]);
    const [popupMode, setPopupMode] = useState("assign");
    const [currentBatchId, setCurrentBatchId] = useState(null);

    // Load instructor courses once
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(fetchInstructorCourses());
        }
    }, [courses.length, dispatch]);

    // Course change effect
    useEffect(() => {
        if (!selectedCourse) {
            dispatch(clearBatches());
            return;
        }
        dispatch(clearBatches());
        dispatch(fetchBatches(selectedCourse));
        dispatch(fetchStudentsByCourse(selectedCourse));
    }, [selectedCourse, dispatch]);

    // Restore previous state
    useEffect(() => {
        if (!selectedCourse && selectedCourseId) {
            setSelectedCourseState(selectedCourseId);
            dispatch(clearBatches());
            dispatch(fetchStudentsByCourse(selectedCourseId));
            dispatch(fetchBatches(selectedCourseId));
        }
    }, [dispatch, selectedCourse, selectedCourseId]);

    // Check selected students
    useEffect(() => {
        const foundAssigned = selectedStudents.some((sid) => {
            const st = students.find((s) => s.student_id === sid);
            return st && st.batch_name && st.batch_name !== "null";
        });
        setHasAssignedSelected(foundAssigned);
    }, [selectedStudents, students]);

    // Reset selections when course changes
    useEffect(() => {
        setSelectedStudents([]);
        setHasAssignedSelected(false);
    }, [selectedCourse]);

    const handleCourseChange = (e) => {
        const cid = e.target.value;
        setSelectedCourseState(cid);
        dispatch(setSelectedCourse(cid));
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    const filteredStudents = students.filter((student) => {
        if (searchText.trim() !== "" && !student.name.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }
        if (selectedBatch === "All") return true;
        if (selectedBatch === "Unassigned") {
            return !student.batch_name || student.batch_name === "null";
        }
        return student.batch_name === selectedBatch;
    });

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
            <div className="assign-batch-page">
                {/* Header */}
                <div className="assign-batch-all-header">
                    <div className="assign-batch-header-left">
                        <div className="assign-batch-header">
                            <p className="assign-batch-title">Assign Students to Batches</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="assign-batch-controls">
                        {/* Search Box */}
                        <div className="assign-batch-search-box">
                            <input
                                type="text"
                                className={`assign-batch-search-input ${searchOpen ? "open" : ""}`}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search students..."
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
                                <span className="info-icon" title="Select a course to load students and batches."> ⓘ</span>
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                className={`assign-batch-select ${!selectedCourse ? "highlight" : ""}`}
                            >
                                <option value="">Select the Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
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
                                    <option key={b.batch_id} value={b.batch_name}>{b.batch_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Only show table if course is selected */}
                {selectedCourse && (
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
                                        {filteredStudents.length === 0 ? (
                                            <tr className="empty-table-row">
                                                <td colSpan={4} className="empty-table-cell">
                                                    {students.length === 0 ? "No students found for this course." : "No students match the selected filters."}
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredStudents.map((student) => {
                                                const isSelected = selectedStudents.includes(student.student_id);
                                                const isAssigned = student.batch_name && student.batch_name !== "null";

                                                return (
                                                    <tr key={student.student_id} className={isSelected ? "selected-row" : ""}>
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
                                                        <td>
                                                            <button
                                                                className={isAssigned ? "assign-batch-move-btn" : "assign-batch-assign-btn"}
                                                                onClick={() => {
                                                                    setPopupStudents([student.student_id]);
                                                                    setPopupMode(isAssigned ? "move" : "assign");
                                                                    setCurrentBatchId(student.batch_id);
                                                                    setShowPopup(true);
                                                                }}
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
                            className="assign-batch-assign-btn"
                                onClick={() => {
                                    setPopupStudents(selectedStudents);
                                    setPopupMode("assign");
                                    setShowPopup(true);
                                }}
                            >
                                Assign to
                            </button>

                            <button
                            className="assign-batch-move-btn"
                                onClick={() => {
                                    setPopupStudents(selectedStudents);
                                    setPopupMode("move");
                                    setShowPopup(true);
                                }}
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
                )}
            </div>
            {showPopup && (
                <SelectBatch
                    selectedStudents={popupStudents}
                    courseId={selectedCourse}
                    mode={popupMode}
                    currentBatchId={currentBatchId}
                    onClose={() => setShowPopup(false)}
                    onSuccess={() => {
                        setShowPopup(false);
                        dispatch(fetchStudentsByCourse(selectedCourse));
                    }}
                />
            )}

        </div>
    );
};

export default AssignBatchTable;
