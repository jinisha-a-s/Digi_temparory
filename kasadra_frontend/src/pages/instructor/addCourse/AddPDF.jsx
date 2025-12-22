import React, { useState, useRef, useEffect } from "react";
import "../../../styles/instructor/addCourse/AddPDF.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { uploadPDF, resetPDFState } from "../../../features/instructor/addCourse/addPDFSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import toast

const AddPDF = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, lessonId } = useParams();

  const { loading, success, error, successMessage, errorMessage } = useSelector(
    (state) => state.pdf
  );

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // ------------------------ File Change Handler ------------------------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    dispatch(resetPDFState()); // clear old messages
    setFile(null);

    if (!selectedFile) return;

    // Only allow PDF
    if (selectedFile.type !== "application/pdf") {
      dispatch({
        type: "pdf/uploadPDF/rejected",
        payload: "Only PDF files are allowed.",
      });
      return;
    }

    // Max 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      dispatch({
        type: "pdf/uploadPDF/rejected",
        payload: "File too large. Maximum allowed size is 5MB.",
      });
      return;
    }

    setFile(selectedFile);
  };

  // ------------------------ Clear Button ------------------------
  const handleClear = () => {
    setFile(null);
    dispatch(resetPDFState());
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ------------------------ Submit Handler ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPDFState());

    if (!file) return; // No toast here, just ignore submission

    const formData = new FormData();
    formData.append("file", file);
    formData.append("course_id", courseId);
    formData.append("lesson_id", lessonId);

    dispatch(uploadPDF(formData));
  };

  // ------------------------ On Success → Toast + Redirect ------------------------
  useEffect(() => {
    if (success) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success(successMessage || "PDF uploaded successfully!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => {
        dispatch(resetPDFState());
        navigate(`/instructor/${courseId}/${lessonId}/lesson-content`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, successMessage, dispatch, navigate, courseId, lessonId]);

  // ------------------------ On Error → Toast ------------------------
  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "Something went wrong!", {
        duration: 3000,
        position: "top-center",
        style: { marginTop: "100px" },
      });

      const timer = setTimeout(() => dispatch(resetPDFState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, errorMessage, dispatch]);

  return (
    <div className="addpdf-page">
      {/* Toast container */}
      <Toaster />

      <div className="addpdf-navbar">
        <Instructornavbar />
      </div>

      <div className="addpdf-body">
        <div className="addpdf-table">
          <div className="addpdf-upload-box">
            <div className="addpdf-header">
              <BackButton />
              <h3 className="addpdf-title">Upload PDF</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="addpdf-input-row">
                <label htmlFor="addpdf-file" className="addpdf-label">
                  Upload File
                </label>

                <input
                  type="file"
                  id="addpdf-file"
                  ref={fileInputRef}
                  className="addpdf-input"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />

                {file && <p className="addpdf-file-name">Selected: {file.name}</p>}
              </div>

              <div className="addpdf-btn-row">
                <button type="submit" className="addpdf-btn addpdf-ok" disabled={loading}>
                  {loading ? "Uploading..." : "OK"}
                </button>

                <button type="button" className="addpdf-btn addpdf-clear" onClick={handleClear}>
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

export default AddPDF;
