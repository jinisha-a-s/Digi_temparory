import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseAPI } from "../../../api/instructor/addCourse/AddcourseAuth.js";
import "../../../styles/instructor/addCourse/AddNewCourse.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton.jsx";
import toast from "react-hot-toast";
import InstructorhomePage from "../InstructorhomePage.jsx";

// ✅ Import toast

const AddNewCourse = () => {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingAddContent, setLoadingAddContent] = useState(false);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duration: "",
    thumbnail: "",
  });

  const validateForm = (form) => {
    let newErrors = { title: "", description: "", duration: "", thumbnail: "" };
    let isValid = true;

    if (!form.title.value.trim()) {
      newErrors.title = "Course title is required.";
      isValid = false;
    } else if (form.title.value.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
      isValid = false;
    }

    const number = form["duration-number"].value.trim();
    const unit = form["duration-unit"].value.trim();

    if (!number) {
      newErrors.duration = "Duration number is required.";
      isValid = false;
    } else if (Number(number) <= 0) {
      newErrors.duration = "Duration must be a positive number.";
      isValid = false;
    }

    if (!unit) {
      newErrors.duration = "Please select duration unit.";
      isValid = false;
    }

    if (number && unit) {
      form.duration.value = `${number} ${unit}`;
    }

    const durationPattern = /^[0-9]+\s?(weeks?|months?|days?)$/i;
    if (!form.duration.value.trim()) {
      newErrors.duration = "Duration is required.";
      isValid = false;
    } else if (!durationPattern.test(form.duration.value.trim())) {
      newErrors.duration = "Enter valid duration (e.g. 3 months, 12 weeks).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddCourse = async (e, shouldNavigateToContent = false) => {
    e.preventDefault();
    const form = e.target.form || e.target.closest("form");

    if (!validateForm(form)) {
      return;
    }

    if (shouldNavigateToContent) setLoadingAddContent(true);
    else setLoadingSave(true);

    const file = form.thumbnail.files[0];
    const fd = new FormData();
    fd.append("title", form.title.value);
    fd.append("description", form.description.value);
    fd.append("duration", form.duration.value);
    fd.append("instructor_id", localStorage.getItem("instructorId"));
    if (file) fd.append("thumbnail", file);

    try {
      const course = await addCourseAPI(fd);

      form.reset();

      // ✅ Show toast instead of alert
      toast.success("Course added successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" }
      });

      const courseId = course.course_id;

      if (shouldNavigateToContent && courseId) {
        navigate(`/courses/${courseId}/add-content`);
      } else {
        navigate("/instructor/view-course");
      }
    } catch (err) {
      console.error("Add failed", err.response?.data || err.message);

      // ✅ Error toast
      toast.error("Failed to add course", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" }
      });
    } finally {
      setLoadingSave(false);
      setLoadingAddContent(false);
    }
  };

  return (
    <div className="add-new-course-instructor-home">
      <InstructorhomePage />
      <div className="add-new-course-container">
        <Instructornavbar />
        <div className="add-new-course-header-close">
          <BackButton className="add-new-course-close-button" />
        </div>

        <h2 className="add-new-course-title">Add Your Course Details</h2>

        <form className="add-new-course-form" data-testid="add-course-form">
          {/* Title */}
          <div className="add-new-course-group">
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter course title"
              data-testid="input-title"
              required
              onChange={(e) => setErrors((prev) => ({ ...prev, title: "" }))}
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="add-new-course-group">
            <label>Course Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Enter course description"
              data-testid="input-description"
              required
              onChange={() => setErrors((prev) => ({ ...prev, description: "" }))}
            />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>

          {/* Duration */}
          <div className="add-new-course-group">
            <label>Duration</label>
            <div className="add-new-course-duration-row">
              <input
                type="number"
                min="1"
                name="duration-number"
                placeholder="Number"
                className="add-new-course-duration-number"
                data-testid="input-duration-number"
                onChange={() => setErrors((prev) => ({ ...prev, duration: "" }))}
              />
              <select
                name="duration-unit"
                className="add-new-course-duration-select"
                data-testid="input-duration-unit"
                onChange={() => setErrors((prev) => ({ ...prev, duration: "" }))}
              >
                <option value="">Select Unit</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
            <input type="hidden" name="duration" />
            {errors.duration && <p className="form-error">{errors.duration}</p>}
          </div>

          {/* Instructor */}
          <div className="add-new-course-group">
            <label>Instructor</label>
            <input
              type="text"
              value={localStorage.getItem("instructorName") || "Instructor Name"}
              name="instructor-name"
              readOnly
            />
          </div>

          {/* Thumbnail */}
          <div className="add-new-course-group">
            <label htmlFor="input-thumbnail">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              data-testid="input-thumbnail"
              id="input-thumbnail"
              name="thumbnail"
              onChange={() => setErrors((prev) => ({ ...prev, thumbnail: "" }))}
            />
            {errors.thumbnail && <p className="form-error">{errors.thumbnail}</p>}
          </div>

          {/* Buttons */}
          <div className="add-new-course-buttons">
            <button
              type="button"
              className="add-new-course-btn add-new-course-save-btn"
              onClick={(e) => handleAddCourse(e, false)}
              disabled={loadingSave || loadingAddContent}
            >
              {loadingSave ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="add-new-course-btn add-new-course-add-btn"
              onClick={(e) => handleAddCourse(e, true)}
              disabled={loadingSave || loadingAddContent}
              data-testid="submit-button"
            >
              {loadingAddContent ? "Loading..." : "Add Content"}
            </button>

            <button
              type="button"
              className="add-new-course-btn add-new-course-cancel-btn"
              onClick={(e) => {
                e.target.closest("form").reset();
                setErrors({ title: "", description: "", duration: "", thumbnail: "" });
              }}
              disabled={loadingSave || loadingAddContent}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCourse;
