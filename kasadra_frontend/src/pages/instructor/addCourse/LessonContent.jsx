import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
 
// Actions
import {
  addLesson,
  resetLessonState,
} from "../../../features/instructor/addCourse/addLessonSlice";
import {
  uploadPDF,
  resetPDFState,
} from "../../../features/instructor/addCourse/addPDFSlice";
import {
  uploadWeblink,
  resetWeblinkState,
} from "../../../features/instructor/addCourse/addWeblinkSlice";
import {
  createNote,
  reset as resetNoteState,
} from "../../../features/instructor/addCourse/notePadSlice";
import {
  addQuiz,
  resetQuizState,
} from "../../../features/instructor/addCourse/addQuizSlice";
import {
  addLab,
  resetLabState,
} from "../../../features/instructor/addCourse/addLabSlice";
 
import "../../../styles/instructor/addCourse/LessonContent.css";
 
const LessonContent = ({ courseId, onClose }) => {
  const dispatch = useDispatch();
  const instructorId = localStorage.getItem("instructorId");
 
  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");
  const [lessonSaved, setLessonSaved] = useState(false);
  const [showContentSection, setShowContentSection] = useState(false);
  const [activeTab, setActiveTab] = useState("notes");
 
  const [content, setContent] = useState({
    pdf: null,
    webLink: "",
    notes: "",
    quiz: { name: "", description: "", link: "", file: null },
    lab: { name: "", description: "", link: "", file: null },
  });
 
  const pdfInputRef = useRef(null);
  const quizPdfRef = useRef(null);
  const labPdfRef = useRef(null);
 
  // --- REDUX SELECTORS ---
  const {
    loading: lessonLoading,
    success: lessonSuccess,
    error: lessonError,
    lessonId,
  } = useSelector((state) => state.addLesson);
  const {
    loading: pdfLoading,
    success: pdfSuccess,
    successMessage: pdfMsg,
    errorMessage: pdfErr,
  } = useSelector((state) => state.pdf);
  const {
    loading: linkLoading,
    success: linkSuccess,
    successMessage: linkMsg,
    errorMessage: linkErr,
  } = useSelector((state) => state.weblink);
  const {
    loading: noteLoading,
    success: noteSuccess,
    successMessage: noteMsg,
    errorMessage: noteErr,
  } = useSelector((state) => state.notes);
  const {
    loading: quizLoading,
    success: quizSuccess,
    successMessage: quizMsg,
    error: quizErr,
  } = useSelector((state) => state.quiz);
  const {
    loading: labLoading,
    success: labSuccess,
    error: labErr,
  } = useSelector((state) => state.lab);
 
  const tabs = ["notes", "webLink", "pdf", "quiz", "lab"];
 
  // --- 1. RESET ALL STATES ON MOUNT & UNMOUNT ---
  // இந்த பகுதி பாப்-அப்-ஐ மூடும்போது பழைய சக்சஸ் மெசேஜ்களை கிளியர் செய்யும்
  const resetAllFields = () => {
    dispatch(resetLessonState());
    dispatch(resetPDFState());
    dispatch(resetWeblinkState());
    dispatch(resetNoteState());
    dispatch(resetQuizState());
    dispatch(resetLabState());
  };
 
  useEffect(() => {
    resetAllFields(); // Mount ஆகும்போது ரீசெட்
    return () => resetAllFields(); // Unmount (Close) ஆகும்போது ரீசெட்
  }, [dispatch]);
 
  const handleClose = () => {
    resetAllFields();
    if (onClose) onClose();
  };
 
  // --- SUCCESS & ERROR HANDLING (TOASTS) ---
 
  useEffect(() => {
    if (lessonSuccess) {
      toast.success("Lesson saved successfully!");
      setLessonSaved(true);
    }
    if (lessonError) {
      toast.error(lessonError);
      dispatch(resetLessonState());
    }
  }, [lessonSuccess, lessonError, dispatch]);
 
  useEffect(() => {
    if (pdfSuccess) {
      toast.success(pdfMsg || "PDF uploaded successfully!");
      setContent((prev) => ({ ...prev, pdf: null }));
      if (pdfInputRef.current) pdfInputRef.current.value = "";
      dispatch(resetPDFState());
    }
    if (pdfErr) {
      toast.error(pdfErr);
      dispatch(resetPDFState());
    }
  }, [pdfSuccess, pdfMsg, pdfErr, dispatch]);
 
  useEffect(() => {
    if (linkSuccess) {
      toast.success(linkMsg || "Weblink saved successfully!");
      setContent((prev) => ({ ...prev, webLink: "" }));
      dispatch(resetWeblinkState());
    }
    if (linkErr) {
      toast.error(linkErr);
      dispatch(resetWeblinkState());
    }
  }, [linkSuccess, linkMsg, linkErr, dispatch]);
 
  useEffect(() => {
    if (noteSuccess) {
      toast.success(noteMsg || "Notes saved successfully!");
      setContent((prev) => ({ ...prev, notes: "" }));
      dispatch(resetNoteState());
    }
    if (noteErr) {
      toast.error(noteErr);
      dispatch(resetNoteState());
    }
  }, [noteSuccess, noteMsg, noteErr, dispatch]);
 
  useEffect(() => {
    if (quizSuccess) {
      toast.success(quizMsg || "Quiz added successfully!");
      setContent((prev) => ({
        ...prev,
        quiz: { name: "", description: "", link: "", file: null },
      }));
      if (quizPdfRef.current) quizPdfRef.current.value = "";
      dispatch(resetQuizState());
    }
    if (quizErr) {
      toast.error(quizErr);
      dispatch(resetQuizState());
    }
  }, [quizSuccess, quizMsg, quizErr, dispatch]);
 
  useEffect(() => {
    if (labSuccess) {
      toast.success("Lab added successfully!");
      setContent((prev) => ({
        ...prev,
        lab: { name: "", description: "", link: "", file: null },
      }));
      if (labPdfRef.current) labPdfRef.current.value = "";
      dispatch(resetLabState());
    }
    if (labErr) {
      toast.error(labErr);
      dispatch(resetLabState());
    }
  }, [labSuccess, labErr, dispatch]);
 
  // --- HANDLERS ---
  const handleSaveLesson = () => {
    if (!lessonName.trim() || !description.trim()) {
      setValidationError("Please fill Lesson Name and Description");
      return;
    }
    dispatch(
      addLesson({
        instructor_id: Number(instructorId),
        course_id: Number(courseId),
        title: lessonName,
        description,
      })
    );
  };
 
  const handleSavePDF = () => {
    if (!content.pdf) return toast.error("Please select a PDF file");
    const formData = new FormData();
    formData.append("file", content.pdf);
    formData.append("course_id", courseId);
    formData.append("lesson_id", lessonId);
    dispatch(uploadPDF(formData));
  };
 
  const handleSaveWeblink = () => {
    if (!content.webLink.trim()) return toast.error("Please enter a link");
    dispatch(
      uploadWeblink({
        course_id: Number(courseId),
        lesson_id: Number(lessonId),
        link_url: content.webLink,
      })
    );
  };
 
  const handleSaveNotes = () => {
    if (!content.notes.trim()) return toast.error("Please enter some notes");
    dispatch(
      createNote({
        instructor_id: Number(instructorId),
        course_id: Number(courseId),
        lesson_id: Number(lessonId),
        notes: content.notes,
      })
    );
  };
 
  const handleSaveQuiz = () => {
    if (!content.quiz.name || !content.quiz.description)
      return toast.error("Name and Description are required");
    const formData = new FormData();
    formData.append("instructor_id", Number(instructorId));
    formData.append("course_id", Number(courseId));
    formData.append("lesson_id", Number(lessonId));
    formData.append("name", content.quiz.name);
    formData.append("description", content.quiz.description);
    formData.append("url", content.quiz.link);
    if (content.quiz.file) formData.append("file", content.quiz.file);
    dispatch(addQuiz(formData));
  };
 
  const handleSaveLab = () => {
    if (!lessonId) return toast.error("Please save lesson first");
    if (!content.lab.name || !content.lab.description)
      return toast.error("Name and Description are required");
    const formData = new FormData();
    formData.append("instructor_id", Number(instructorId));
    formData.append("course_id", Number(courseId));
    formData.append("lesson_id", Number(lessonId));
    formData.append("name", content.lab.name);
    formData.append("description", content.lab.description);
    formData.append("url", content.lab.link);
    if (content.lab.file) formData.append("file", content.lab.file);
    dispatch(addLab(formData));
  };
 
  return (
    <div className="lesson-content">
      <Toaster position="top-center" reverseOrder={false} />
 
      {!lessonSaved ? (
        <div className="initial-form">
          <div className="form-group">
            <label>Lesson Title</label>
            <input
              placeholder="Lesson Title"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Lesson Description ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="btn-row">
            <button
              className="submit-btn"
              onClick={handleSaveLesson}
              disabled={lessonLoading}
            >
              {lessonLoading ? "Saving..." : "Save Lesson"}
            </button>
            {/* <button className="skip-btn" onClick={handleClose}>
              Cancel
            </button> */}
          </div>
        </div>
      ) : !showContentSection ? (
        <div className="after-save-box">
          <p>
            ✅ Lesson <b>{lessonName}</b> saved!
          </p>
          <div className="btn-row">
            <button
              className="submit-btn2"
              onClick={() => setShowContentSection(true)}
            >
              + Add Content
            </button>
            <button className="skip-btn" onClick={handleClose}>
              Skip
            </button>
          </div>
        </div>
      ) : (
        <div className="content-management">
          <div className="lesson-header">
            Lesson Name: <b>{lessonName}</b>
            {/* <button className="close-x" onClick={handleClose}>
              ×
            </button> */}
          </div>
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
 
          <div className="tab-panel">
            {activeTab === "pdf" && (
              <div className="form-group">
                <input
                  type="file"
                  hidden
                  ref={pdfInputRef}
                  accept="application/pdf"
                  onChange={(e) =>
                    setContent({ ...content, pdf: e.target.files[0] })
                  }
                />
                <button
                  className="upload-btn"
                  onClick={() => pdfInputRef.current.click()}
                >
                  Choose PDF
                </button>
                {content.pdf && <p className="file-name">{content.pdf.name}</p>}
                <button
                  className="submit-btn"
                  onClick={handleSavePDF}
                  disabled={pdfLoading}
                >
                  Save PDF
                </button>
              </div>
            )}
 
            {activeTab === "webLink" && (
              <div className="form-group">
                <label>Web Link</label>
                <input
                  value={content.webLink}
                  onChange={(e) =>
                    setContent({ ...content, webLink: e.target.value })
                  }
                  placeholder="https://..."
                />
                <button
                  className="submit-btn"
                  onClick={handleSaveWeblink}
                  disabled={linkLoading}
                >
                  Save Link
                </button>
              </div>
            )}
 
            {activeTab === "notes" && (
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={content.notes}
                  onChange={(e) =>
                    setContent({ ...content, notes: e.target.value })
                  }
                  placeholder="Write notes here..."
                />
                <button
                  className="submit-btn"
                  onClick={handleSaveNotes}
                  disabled={noteLoading}
                >
                  Save Note
                </button>
              </div>
            )}
 
            {activeTab === "quiz" && (
              <div className="quiz-form">
                <div className="form-group">
                  <label>Quiz Name</label>
                  <input
                    placeholder="Enter the Quiz Name"
                    value={content.quiz.name}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quiz: { ...content.quiz, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter the Quiz Description"
                    value={content.quiz.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quiz: { ...content.quiz, description: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Quiz URL</label>
                  <input
                    placeholder="https://..."
                    value={content.quiz.link}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quiz: { ...content.quiz, link: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Quiz PDF</label>
                  <input
                    type="file"
                    ref={quizPdfRef}
                    accept="application/pdf"
                    onChange={(e) =>
                      setContent({
                        ...content,
                        quiz: { ...content.quiz, file: e.target.files[0] },
                      })
                    }
                  />
                </div>
                <button
                  className="submit-btn"
                  onClick={handleSaveQuiz}
                  disabled={quizLoading}
                >
                  Save Quiz
                </button>
              </div>
            )}
 
            {activeTab === "lab" && (
              <div className="quiz-form">
                <div className="form-group">
                  <label>Lab Name</label>
                  <input
                    placeholder="Enter the Lab Name"
                    value={content.lab.name}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        lab: { ...content.lab, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter the Lab Description"
                    value={content.lab.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        lab: { ...content.lab, description: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Lab URL</label>
                  <input
                    placeholder="https://..."
                    value={content.lab.link}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        lab: { ...content.lab, link: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Lab PDF</label>
                  <input
                    type="file"
                    ref={labPdfRef}
                    accept="application/pdf"
                    onChange={(e) =>
                      setContent({
                        ...content,
                        lab: { ...content.lab, file: e.target.files[0] },
                      })
                    }
                  />
                </div>
                <button
                  className="submit-btn"
                  onClick={handleSaveLab}
                  disabled={labLoading}
                >
                  Save Lab
                </button>
              </div>
            )}
          </div>
          <div className="footer-actions">
            {/* <button className="finish-btn" onClick={handleClose}>
              Finish & Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default LessonContent;