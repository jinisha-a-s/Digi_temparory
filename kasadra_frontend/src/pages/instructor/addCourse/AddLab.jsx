import React, { useState, useEffect } from "react";
import "../../../styles/instructor/addCourse/AddLab.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addLab, resetLabState } from "../../../features/instructor/addCourse/addLabSlice.js";
import toast, { Toaster } from "react-hot-toast";

const AddLab = () => {
  const [labName, setLabName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { loading, success, error } = useSelector((state) => state.lab);

  // ---- URL Validation ----
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // ---- Reset form + Redirect on success ----
  useEffect(() => {
    if (success) {
      toast.success("Lab added successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      handleClear();

      const timer = setTimeout(() => {
        dispatch(resetLabState());
        navigate(`/instructor/${courseId}/${lessonId}/lesson-content`);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch, navigate, courseId, lessonId]);

  // ---- Backend error toast ----
  useEffect(() => {
    if (error) {
      toast.error(error || "Something went wrong!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => dispatch(resetLabState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // ---- Form Validation ----
  const validateForm = () => {
    const newErrors = {};
    if (!labName.trim()) newErrors.labName = "Lab name is required";

    if (!link.trim()) newErrors.link = "Link is required";
    else if (!isValidURL(link)) newErrors.link = "Invalid URL format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(resetLabState()); // Clear previous success/error

    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("lesson_id", lessonId);
    formData.append("name", labName);
    formData.append("description", description);
    formData.append("url", link);
    if (pdfFile) formData.append("file", pdfFile);

    dispatch(addLab(formData));
  };

  // ---- Clear Fields ----
  const handleClear = () => {
    setLabName("");
    setDescription("");
    setLink("");
    setPdfFile(null);
    setErrors({});
  };

  // ---- File Change ----
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, pdf: "Please upload only PDF files!" }));
      e.target.value = null;
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, pdf: "File must be less than 5MB" }));
      e.target.value = null;
      return;
    }

    setErrors((prev) => ({ ...prev, pdf: "" }));
    setPdfFile(file);
  };

  return (
    <div className="add-lab-page">
      <Toaster /> {/* ✅ Toast container */}

      <div className="add-lab-navbar">
        <Instructornavbar />
      </div>

      <div className="add-lab-body">
        <div className="add-lab-card enhanced-ui">
          <div className="add-lab-header">
            <BackButton />
            <h2 className="add-lab-title">Add Lab</h2>
          </div>

          <form className="add-lab-form" onSubmit={handleSubmit}>

            {/* Lab Name */}
            <div className="add-lab-field">
              <label className="add-lab-label">Lab Name *</label>
              <input
                type="text"
                placeholder="Enter lab name"
                value={labName}
                onChange={(e) => {
                  setLabName(e.target.value);
                  setErrors((prev) => ({ ...prev, labName: "" }));
                }}
                className="add-lab-input"
              />
              {errors.labName && <p className="add-lab-error">{errors.labName}</p>}
            </div>

            {/* Description */}
            <div className="add-lab-field">
              <label className="add-lab-label">Description (Optional)</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-lab-textarea"
              ></textarea>
            </div>

            {/* Link */}
            <div className="add-lab-field">
              <label className="add-lab-label">Lab Link *</label>
              <input
                type="text"
                placeholder="Enter lab link"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setErrors((prev) => ({ ...prev, link: "" }));
                }}
                className="add-lab-input"
              />
              {errors.link && <p className="add-lab-error">{errors.link}</p>}
            </div>

            {/* PDF Upload */}
            <div className="add-lab-field">
              <label className="add-lab-label">Upload PDF (Optional)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="add-lab-file-input"
              />
              {pdfFile && <p className="add-lab-file-name">Selected: {pdfFile.name}</p>}
              {errors.pdf && <p className="add-lab-error">{errors.pdf}</p>}
            </div>

            {/* Buttons */}
            <div className="add-lab-buttons">
              <button type="submit" className="add-lab-ok-btn" disabled={loading}>
                {loading ? "Uploading..." : "OK"}
              </button>

              <button type="button" className="add-lab-clear-btn" onClick={handleClear} disabled={loading}>
                Clear
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLab;
