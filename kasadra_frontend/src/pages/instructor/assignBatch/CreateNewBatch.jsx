import React, { useState, useEffect } from "react";
import "../../../styles/instructor/assignBatch/CreateNewBatch.css";
import { useDispatch, useSelector } from "react-redux";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import { fetchCourses, createBatch, resetBatchState } from "../../../features/instructor/assignBatch/createNewBatchSlice";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";


const AddBatchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --------------------------
  // Form State
  // --------------------------
  const [formData, setFormData] = useState({
    courseName: "",
    batchName: "",
    numberOfStudents: "",
    timing: "",
    startDate: "",
    endDate: "",
  });

  // Field-specific errors
  const [errors, setErrors] = useState({});

  // Redux State
  const { courses, loading, error, success } = useSelector((state) => state.newBatch);

  // Fetch Courses
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setFormData({
          courseName: "",
          batchName: "",
          numberOfStudents: "",
          timing: "",
          startDate: "",
          endDate: "",
        });

        dispatch(resetBatchState());

        navigate("/instructor/assign-batch");   // ✅ Navigate after success
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate]);


  // Success reset
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setFormData({
          courseName: "",
          batchName: "",
          numberOfStudents: "",
          timing: "",
          startDate: "",
          endDate: "",
        });
        dispatch(resetBatchState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  if (loading) return <Spinner />;

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for field when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseName) newErrors.courseName = "Please select a course.";

    if (!formData.batchName.trim()) newErrors.batchName = "Batch name is required.";

    if (!formData.numberOfStudents || formData.numberOfStudents <= 0)
      newErrors.numberOfStudents = "Enter a valid number of students.";

    if (!formData.timing.trim()) newErrors.timing = "Timing is required.";

    if (!formData.startDate) newErrors.startDate = "Start date is required.";

    if (!formData.endDate) newErrors.endDate = "End date is required.";

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate)
      newErrors.endDate = "End date cannot be before start date.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const postData = {
      course_id: parseInt(formData.courseName),
      batch_name: formData.batchName,
      num_students: parseInt(formData.numberOfStudents),
      instructor_id: parseInt(localStorage.getItem("instructorId")),
      timing: formData.timing,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    dispatch(createBatch(postData));
  };

  const handleCancel = () => {
    setFormData({
      courseName: "",
      batchName: "",
      numberOfStudents: "",
      timing: "",
      startDate: "",
      endDate: "",
    });

    setErrors({});
  };

  return (
    <div className="create-new-batch-page">
      <div className="create-new-batch">
        <div className="create-new-batch-navbar">
          <Instructornavbar />
        </div>

        <div className="create-new-batch-header">
          <BackButton to="/instructor/assign-batch" />
          <p className="create-new-batch-title">Add New Batch</p>
        </div>

        <div className="create-new-batch-body">
          <div className="create-new-batch-container">
            <form className="create-new-batch-form" onSubmit={handleSubmit}>

              {/* Course */}
              <div className="create-new-batch-group">
                <label>Course Name</label>
                <select name="courseName" value={formData.courseName} onChange={handleChange}>
                  <option value="">-- Select Course --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                {errors.courseName && <p className="create-new-batch-error">{errors.courseName}</p>}
              </div>

              {/* Batch Name */}
              <div className="create-new-batch-group">
                <label>Batch Name</label>
                <input
                  type="text"
                  name="batchName"
                  value={formData.batchName}
                  onChange={handleChange}
                />
                {errors.batchName && <p className="create-new-batch-error">{errors.batchName}</p>}
              </div>

              {/* Students */}
              <div className="create-new-batch-group">
                <label>Number of Students</label>
                <input
                  type="number"
                  name="numberOfStudents"
                  value={formData.numberOfStudents}
                  onChange={handleChange}
                  min="1"   // ✅ prevents negative values
                />

                {errors.numberOfStudents && (
                  <p className="create-new-batch-error">{errors.numberOfStudents}</p>
                )}
              </div>

              {/* Instructor */}
              <div className="create-new-batch-group">
                <label>Instructor</label>
                <input
                  type="text"
                  value={localStorage.getItem("instructorName") || "Instructor Name"}
                  readOnly
                />
              </div>

              {/* Timing */}
              <div className="create-new-batch-group">
                <label>Timing</label>
                <input
                  type="time"
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                />
                {errors.timing && <p className="create-new-batch-error">{errors.timing}</p>}
              </div>

              {/* Start Date */}
              <div className="create-new-batch-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && <p className="create-new-batch-error">{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div className="create-new-batch-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && <p className="create-new-batch-error">{errors.endDate}</p>}
              </div>

              {/* Success Message */}
              {success && (
                <p className="create-new-batch-success">✅ Batch added successfully!</p>
              )}

              {/* Server Error */}
              {error && <p className="create-new-batch-error">{error}</p>}

              {/* Buttons */}
              <div className="create-new-batch-actions">
                <button type="submit" className="create-new-batch-btn create-new-batch-save">
                  Save
                </button>
                <button
                  type="button"
                  className="create-new-batch-btn create-new-batch-cancel"
                  onClick={handleCancel}
                >
                  Clear
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBatchForm;
