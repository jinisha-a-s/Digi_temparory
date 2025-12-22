import React from "react";
import { useState, useEffect } from "react";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import "../../../styles/instructor/assignBatch/SelectBatch.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { assignStudentsToBatch, resetAssignStatus, clearBatches, moveStudents } from "../../../features/instructor/assignBatch/SelectBatchSlice.js";

const SelectBatch = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { batches, assignSuccess } = useSelector((state) => state.batches);
    const { loading, error, successMessage } = useSelector((state) => state.selectBatch);

    const { selectedStudents, courseId, mode } = location.state || {};


    console.log('students', selectedStudents);


    const [selectedBatchId, setSelectedBatchId] = useState(null);

    // If user refreshes the page → redirect back
    useEffect(() => {
        if (!selectedStudents || !courseId) {
            navigate("/instructor/assign-batch");
        }
    }, []);

    // When assign is successful → go back
    useEffect(() => {
        if (successMessage) {
            // Instead of alert(successMessage)
            const timer = setTimeout(() => {
                dispatch(resetAssignStatus());
                navigate("/instructor/assign-batch");
            }, 1000); // 2 seconds

            // Cleanup
            return () => clearTimeout(timer);
        }
    }, [successMessage]);



    // Clear previous error when entering this page
    useEffect(() => {
        dispatch(clearBatches());
    }, []);


    const handleAssign = () => {
        if (!selectedBatchId) {
            alert("Please select a batch");
            return;
        }

        if (mode === "move") {
            dispatch(
                moveStudents({
                    batchId: selectedBatchId,
                    course_id: courseId,
                    studentIds: selectedStudents
                })
            );
        } else {
            dispatch(
                assignStudentsToBatch({
                    batchId: selectedBatchId,
                    course_id: courseId,
                    studentIds: selectedStudents
                })
            );
        }
    };



    return (
        <div className="select-batch-page">
            <div className="select-batch-navbar">
                <Instructornavbar />
            </div>

            <div className="select-batch-wrapper">
                <div className="select-batch-container">
                    <div className="select-batch-header">
                        <BackButton to="/instructor/assign-batch" />
                        <h2 className="select-batch-title">Select Batch</h2>
                    </div>

                    <div className="select-batch-box">

                        {batches.map((batch) => (
                            <div
                                key={batch.batch_id}
                                className={`select-batch-card ${selectedBatchId === batch.batch_id ? "active" : ""}`}
                                onClick={() => setSelectedBatchId(batch.batch_id)}
                            >
                                {batch.batch_name}
                            </div>
                        ))}

                    </div>

                    <button
                        className="select-batch-add-btn"
                        onClick={handleAssign}
                        disabled={loading}
                    >
                        {loading ? "Assigning..." : "Add"}
                    </button>

                    {assignSuccess && (
                        <p className="select-batch-success">{successMessage}</p>
                    )}


                    {error && (
                        <p className="select-batch-error">{error}</p>
                    )}

                </div>
            </div>

        </div>
    );
};

export default SelectBatch;