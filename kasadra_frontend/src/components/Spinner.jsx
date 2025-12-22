import React from "react";
import "../styles/components/Spinner.css"; // ✅ styling

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" role="status" data-testid="loading-spinner">
        <div className="spinner-circle"></div>
        {/* <span className="sr-only">Loading...</span> */}
      </div>
      <p className="spinner-text">Please wait, loading...</p>
    </div>
  );
}
