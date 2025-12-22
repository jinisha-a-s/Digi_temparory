import React from "react";
import "../../../styles/instructor/liveClassUpdate/LiveStudentActivity.css";
import Instructornavbar from "../../../components/Instructornavbar";

const LiveStudentActivity = () => {
  const labData = [
    {
      time: "10:32 AM",
      student: "Alice",
      type: "Lab",
      score: "85%",
      status: "Completed",
    },
    {
      time: "10:32 AM",
      student: "Heman",
      type: "Lab",
      score: "70%",
      status: "In progress",
    },
    {
      time: "10:32 AM",
      student: "John",
      type: "Lab",
      score: "70%",
      status: "Not started",
    },
  ];

  const quizData = [
    {
      time: "10:32 AM",
      student: "Alice",
      type: "Quiz",
      score: "85%",
      status: "Completed",
    },
    {
      time: "10:32 AM",
      student: "Heman",
      type: "Quiz",
      score: "70%",
      status: "Completed",
    },
    {
      time: "10:32 AM",
      student: "John",
      type: "Quiz",
      score: "70%",
      status: "In progress",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "In progress":
        return "status-progress";
      case "Not started":
        return "status-notstarted";
      default:
        return "";
    }
  };

  const renderTable = (title, data) => (
    <div className="activity-section">
      <h3>{title}</h3>
      <table className="activity-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Student</th>
            <th>Activity Type</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td>{row.student}</td>
              <td>{row.type}</td>
              <td>
                <strong>{row.score}</strong>
              </td>
              <td className={`status ${getStatusClass(row.status)}`}>
                <span className="status-dot"></span>
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="live-activity-container">
      <Instructornavbar />
      <h2>Live Student Activity</h2>

      <div className="filter-bar">
        <div className="filter">
          <label>Select Course</label>
          <select name="" id="">
            <option value="">-- Select Course --</option>
            <option value="React Basics">React Basics</option>
            <option value="Advanced Python">Advanced Python</option>
            <option value="Data Science">Data Science</option>
          </select>
          {/* </label> */}
          {/* <button className="filter-btn">Terraform</button> */}
        </div>
        <div className="filter">
          <label>Select Batch</label>
          <select name="" id="">
            <option value="">-- Select Batch --</option>
            <option value="batchA">All Batch</option>
            <option value="batchA">Batch A</option>
            <option value="batchB">Batch B</option>
            <option value="batchC">Batch C</option>
          </select>
          {/* <button className="filter-btn">Batch A</button> */}
        </div>
      </div>

      {renderTable("Lab", labData)}
      {renderTable("Quiz", quizData)}
    </div>
  );
};

export default LiveStudentActivity;
