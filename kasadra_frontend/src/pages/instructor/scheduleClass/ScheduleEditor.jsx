

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCourses,
    fetchBatches,
    fetchSchedule,
    updateSchedule,
} from "../../../features/instructor/scheduleClass/scheduleEditorSlice";
import "../../../styles/instructor/scheduleClass/ScheduleEditor.css";
import Instructornavbar from "../../../components/Instructornavbar";

const LessonSchedule = () => {
    const dispatch = useDispatch();
    const { courses, batches, lessons, loading } = useSelector(
        (state) => state.scheduleClass
    );

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedLessons, setEditedLessons] = useState([]);

    // Load Courses on Mount
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    // Fetch Batches when Course changes
    useEffect(() => {
        if (selectedCourse) {
            dispatch(fetchBatches(Number(selectedCourse)));
        }
    }, [selectedCourse, dispatch]);



    console.log("Batches:", batches);

    // Fetch Schedule when both course & batch selected
    useEffect(() => {
        if (selectedCourse && selectedBatch) {
            console.log("Fetching schedule for tewqtetiu:");

            dispatch(fetchSchedule({ courseId: selectedCourse, batchId: selectedBatch }));
        }
    }, [selectedCourse, selectedBatch, dispatch]);

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) return "";
        return date.toLocaleDateString("en-US", { weekday: "long" });
    };

    const handleEditClick = () => {
        if (isEditing) {
            editedLessons.forEach((lesson) => {
                // ✅ correct
                dispatch(updateSchedule({ calendarId: lesson.calendar_id, scheduleData: lesson }));

            });
            setIsEditing(false);
        } else {
            setEditedLessons(lessons.map((l) => ({ ...l , calendar_id: l.calendar_id || l.id,})));
            setIsEditing(true);
        }
    };

    const handleLessonChange = (calendarId, field, value) => {
        setEditedLessons((prev) =>
            prev.map((lesson) => {
                if (lesson.calendar_id === calendarId) {  // ✅ fixed
                    const updated = { ...lesson, [field]: value };
                    if (field === "date" || field === "select_date") {
                        updated.day = getDayName(value);
                    }
                    return updated;
                }
                return lesson;
            })
        );
    };


    return (
        <div className="add-weblink-schedule-container">
            <Instructornavbar />

            <hr className="add-weblink-divider" />

            {/* Filters */}
            <div className="add-weblink-filter-section">
                <div className="add-weblink-filter">
                    <label>Select Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">Select Course</option>
                        {courses?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}

                    </select>

                </div>

                <div className="add-weblink-filter">
                    <label>Select Batch</label>
                    <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        disabled={!selectedCourse}
                    >
                        <option value="">Select Batch</option>
                        {loading ? (
                            <option>Loading batches...</option>
                        ) : batches.length === 0 ? (
                            <option>No batches available</option>
                        ) : (
                            batches.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))
                        )}
                    </select>

                </div>
            </div>

            {/* Lesson Table */}
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : (
                <div className="add-weblink-table-container">
                    <table className="add-weblink-table">
                        <thead>
                            <tr>
                                <th>Lesson Name</th>
                                <th>Date</th>
                                <th>Day</th>
                                <th>Timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(isEditing ? editedLessons : lessons).map((lesson) => (
                                <tr key={lesson.calendar_id}>
                                    <td>{lesson.lesson_title}</td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={lesson.select_date || lesson.date}
                                                onChange={(e) => handleLessonChange(lesson.calendar_id, "select_date", e.target.value)}

                                            />
                                        ) : (
                                            new Date(lesson.select_date || lesson.date).toLocaleDateString("en-GB")
                                        )}
                                    </td>
                                    <td>{lesson.day}</td>
                                    <td>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="time"
                                                    value={lesson.start_time || ""}
                                                    onChange={(e) =>
                                                        handleLessonChange(lesson.calendar_id, "start_time", e.target.value)
                                                    }
                                                    style={{ width: "45%", marginRight: "5px" }}
                                                />
                                                <input
                                                    type="time"
                                                    value={lesson.end_time || ""}
                                                    onChange={(e) =>
                                                        handleLessonChange(lesson.calendar_id, "end_time", e.target.value)
                                                    }
                                                    style={{ width: "45%" }}
                                                />
                                            </>
                                        ) : (
                                            lesson.start_time
                                                ? `${lesson.start_time} - ${lesson.end_time}`
                                                : "-"
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="add-weblink-edit-section">
                <button className="add-weblink-edit-btn" onClick={handleEditClick}>
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
        </div>
    );
};

export default LessonSchedule;

