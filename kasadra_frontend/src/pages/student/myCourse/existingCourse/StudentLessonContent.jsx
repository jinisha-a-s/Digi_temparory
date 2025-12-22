import { useParams } from "react-router-dom";
import { useState } from "react";
import Studentnavbar from "../../../../components/Studentnavbar";
import "../../../../styles/student/myCourse/existingCourse/StudentLessonContent.css";

export default function StudentLessonContent() {
  const { lessonId, contentType } = useParams();
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [startedLab, setStartedLab] = useState(false);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [completedLab, setCompletedLab] = useState(false);

  // Dummy lesson data
  const lessonDetails = {
    "1": {
      title: "Lesson 1: Variables",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      notes: [
        "Variables store data values.",
        "Variables can be of different types like int, string, boolean.",
        "Naming rules: cannot start with number, no spaces, no keywords.",
      ],
      quiz: {
        name: "Variables Quiz",
        description: "Test your understanding of variables.",
        link: "#", // dummy link
        guidelinePdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      lab: {
        name: "Variables Lab",
        description: "Hands-on practice with variables.",
        link: "#", // dummy link
        guidelinePdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      weblink: "https://www.example.com",
    },
    "2": {
      title: "Lesson 2: Functions",
      description: "Learn functions and how to reuse code.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      notes: [
        "Functions help in code reuse.",
        "Functions can accept parameters and return values.",
      ],
      quiz: {
        name: "Functions Quiz",
        link: "#",
      },
      lab: {
        name: "Functions Lab",
        link: "#",
      },
      weblink: "https://www.example.com",
    },
    "3": {
      title: "Lesson 3: Loops",
      description: "Understand loops and iterations.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      notes: ["For loop", "While loop", "Nested loops"],
      quiz: {
        name: "Loops Quiz",
        link: "#",
      },
      lab: {
        name: "Loops Lab",
        link: "#",
      },
      weblink: "https://www.example.com",
    },
    "4": {
      title: "Lesson 1: Variables",
      description: "Understand variables in programming.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      notes: [
        "Variables store data values.",
        "Variables can be of different types like int, string, boolean.",
        "Naming rules: cannot start with number, no spaces, no keywords.",
      ],
      quiz: {
        name: "Variables Quiz",
        description: "Test your understanding of variables.",
        link: "#", // dummy link
        guidelinePdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      lab: {
        name: "Variables Lab",
        description: "Hands-on practice with variables.",
        link: "#", // dummy link
        guidelinePdfUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      weblink: "https://www.example.com",
    },
    
  };

  const lesson = lessonDetails[lessonId];

  return (
    <div className="student-lesson-content-container">
      <div className="student-lesson-content-navbar">
        <Studentnavbar />
      </div>

      {/* Lesson info page */}
      {!contentType && (
        <div className="student-lesson-content-header">
          <h2 className="student-lesson-content-title">{lesson?.title}</h2>
          <p className="student-lesson-content-description">{lesson?.description}</p>
        </div>
      )}

      {/* Lesson content */}
      {contentType && (
        <div className="student-lesson-content-body">
          {/* PDF */}
          {contentType === "pdf" && (
            <>
              <div className="student-pdf-actions">
                <a
                  href={lesson.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="student-pdf-btn"
                >
                  Open in New Tab
                </a>
                <a href={lesson.pdfUrl} download className="student-pdf-btn secondary">
                  Download PDF
                </a>
              </div>
              <iframe
                src={lesson.pdfUrl}
                title="Lesson PDF"
                className="student-pdf-preview"
              />
            </>
          )}

          {/* Notes */}
          {contentType === "notes" && (
            <div className="student-lesson-content-item">
              <h3>Notes</h3>
              <ul>
                {lesson.notes?.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quiz */}
          {contentType === "quiz" && (
            <div className="student-lesson-content-item">
              <h3>{lesson.quiz?.name}</h3>
              {lesson.quiz?.description && <p>{lesson.quiz.description}</p>}

              {/* Guideline PDF */}
              {lesson.quiz?.guidelinePdfUrl && (
                <div className="student-pdf-actions" style={{ marginBottom: "12px" }}>
                  <a
                    href={lesson.quiz.guidelinePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="student-pdf-btn"
                  >
                    Open Guideline PDF
                  </a>
                  <a
                    href={lesson.quiz.guidelinePdfUrl}
                    download
                    className="student-pdf-btn secondary"
                  >
                    Download Guideline PDF
                  </a>
                </div>
              )}

              <div className="student-quiz-buttons">
                <button
                  className="student-quiz-btn"
                  onClick={() => setStartedQuiz(true)}
                >
                  Start Quiz
                </button>
                <button
                  className="student-quiz-btn secondary"
                  disabled={!startedQuiz}
                  onClick={() => setCompletedQuiz(true)}
                >
                  Mark as Completed
                </button>
              </div>
              {completedQuiz && <p className="completed-text">Quiz Completed ✅</p>}
            </div>
          )}

          {/* Lab */}
          {contentType === "lab" && (
            <div className="student-lesson-content-item">
              <h3>{lesson.lab?.name}</h3>
              {lesson.lab?.description && <p>{lesson.lab.description}</p>}

              {/* Guideline PDF */}
              {lesson.lab?.guidelinePdfUrl && (
                <div className="student-pdf-actions" style={{ marginBottom: "12px" }}>
                  <a
                    href={lesson.lab.guidelinePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="student-pdf-btn"
                  >
                    Open Guideline PDF
                  </a>
                  <a
                    href={lesson.lab.guidelinePdfUrl}
                    download
                    className="student-pdf-btn secondary"
                  >
                    Download Guideline PDF
                  </a>
                </div>
              )}

              <div className="student-quiz-buttons">
                <button
                  className="student-quiz-btn"
                  onClick={() => setStartedLab(true)}
                >
                  Start Lab
                </button>
                <button
                  className="student-quiz-btn secondary"
                  disabled={!startedLab}
                  onClick={() => setCompletedLab(true)}
                >
                  Mark as Completed
                </button>
              </div>
              {completedLab && <p className="completed-text">Lab Completed ✅</p>}
            </div>
          )}

          {/* Weblink */}
          {contentType === "weblink" && (
            <div className="student-lesson-content-item">
              <a
                href={lesson.weblink}
                target="_blank"
                rel="noopener noreferrer"
                className="student-pdf-btn"
              >
                Open Web Link
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
