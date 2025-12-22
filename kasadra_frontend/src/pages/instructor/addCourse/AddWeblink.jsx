import React, { useState, useEffect } from "react";
import "../../../styles/instructor/addCourse/AddWeblink.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadWeblink, resetWeblinkState } from "../../../features/instructor/addCourse/addWeblinkSlice";
import toast, { Toaster } from "react-hot-toast";

const AddWeblink = () => {
  const [link, setLink] = useState("");
  const [validationError, setValidationError] = useState("");
  const { courseId, lessonId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, successMessage, errorMessage } = useSelector(
    (state) => state.weblink
  );

  // URL VALIDATION FUNCTION
  const validateURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" + // must start with http or https
      "(([a-zA-Z0-9]+(-?[a-zA-Z0-9])*)\\.)+" + // domain
      "[a-zA-Z]{2,}" + // extension
      "(\\/.*)?$", // optional path
      "i"
    );
    return pattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedLink = link.trim();

    // Front-end validations
    if (!trimmedLink) {
      setValidationError("Please enter a link.");
      return;
    }

    if (!validateURL(trimmedLink)) {
      setValidationError("Please enter a valid URL.");
      return;
    }

    if (trimmedLink.startsWith("javascript:")) {
      setValidationError("Invalid URL format.");
      return;
    }

    // Clear validation errors
    setValidationError("");

    const formData = new FormData();
    formData.append("link_url", trimmedLink);
    formData.append("course_id", courseId);
    formData.append("lesson_id", lessonId);

    dispatch(uploadWeblink(formData));
  };

  const handleClear = () => {
    setLink("");
    setValidationError("");
    dispatch(resetWeblinkState());
  };

  // ------------------------ Backend Success → Toast + Redirect ------------------------
  useEffect(() => {
    if (success) {
      setLink("");
      setValidationError("");

      toast.success(successMessage || "Weblink uploaded successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => {
        dispatch(resetWeblinkState());
        navigate(-1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, successMessage, dispatch, navigate]);

  // ------------------------ Backend Error → Toast ------------------------
  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "Something went wrong!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => dispatch(resetWeblinkState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, errorMessage, dispatch]);

  return (
    <div className="add-weblink-page">
      {/* Toast container */}
      <Toaster />

      <div className="add-weblink-navbar">
        <Instructornavbar />
      </div>

      <div className="add-weblink-container">
        <div className="add-weblink-card">
          <div className="add-weblink-header-section">
            <BackButton />
            <h2 className="add-weblink-title">Upload Weblink</h2>
          </div>

          <div className="add-weblink-body">
            <form className="add-weblink-form" onSubmit={handleSubmit}>
              <input
                id="weblink"
                type="text"
                className="add-weblink-input"
                placeholder="Enter web link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              {/* Inline validation error */}
              {validationError && <p className="add-weblink-error">{validationError}</p>}

              <div className="add-weblink-buttons">
                <button
                  type="submit"
                  className="add-weblink-btn add-weblink-ok"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "OK"}
                </button>

                <button
                  type="button"
                  className="add-weblink-btn add-weblink-clear"
                  onClick={handleClear}
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

export default AddWeblink;
