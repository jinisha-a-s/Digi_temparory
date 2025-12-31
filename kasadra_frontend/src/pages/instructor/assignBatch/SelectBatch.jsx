import React, { useState, useEffect, useRef } from "react";
import "../../../styles/instructor/assignBatch/SelectBatch.css";
import { useSelector, useDispatch } from "react-redux";

import {
  assignStudentsToBatch,
  resetAssignStatus,
  moveStudents
} from "../../../features/instructor/assignBatch/SelectBatchSlice.js";

const SelectBatch = ({
  selectedStudents,
  courseId,
  mode,
  currentBatchId,
  onClose,
  onSuccess
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { batches } = useSelector((state) => state.batches);
  const { loading, error, successMessage } = useSelector(
    (state) => state.selectBatch
  );

  const [selectedBatchId, setSelectedBatchId] = useState(null);

  /* 🔥 CENTRALIZED CLOSE HANDLER */
  const handleClose = () => {
    dispatch(resetAssignStatus()); // clear success & error
    setSelectedBatchId(null);
    onClose();
  };

  /* ESC close */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Auto close on success */
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(resetAssignStatus()); // ✅ clear redux BEFORE next open
        onSuccess();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, onSuccess]);

  /* Outside click */
  const handleOverlayClick = (e) => {
    if (!modalRef.current.contains(e.target)) handleClose();
  };

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
    <div className="select-batch-overlay" onClick={handleOverlayClick}>
      <div className="select-batch-popup" ref={modalRef}>
        <div className="select-batch-header">
          <h2>
            {mode === "move"
              ? "Move Students to Batch"
              : "Assign Students to Batch"}
          </h2>
          <button
            className="select-batch-close-btn"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <div className="select-batch-box">
          {batches.map((batch) => {
            const disabled =
              mode === "move" && batch.batch_id === currentBatchId;

            return (
              <div
                key={batch.batch_id}
                className={`select-batch-card 
                  ${selectedBatchId === batch.batch_id ? "active" : ""}
                  ${disabled ? "disabled" : ""}`}
                onClick={() =>
                  !disabled && setSelectedBatchId(batch.batch_id)
                }
              >
                {batch.batch_name}
                {disabled && (
                  <span className="same-batch-tag">Current</span>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="select-batch-add-btn"
          onClick={handleAssign}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : mode === "move"
            ? "Move"
            : "Assign"}
        </button>

        {error && <p className="select-batch-error">{error}</p>}
        {successMessage && (
          <p className="select-batch-success">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SelectBatch;
