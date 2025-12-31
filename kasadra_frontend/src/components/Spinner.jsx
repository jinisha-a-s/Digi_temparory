import React from "react";
import "../styles/components/Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" role="status" data-testid="loading-spinner">
        <div className="spinner-circle"></div>
      </div>
      <p className="spinner-text">Please wait, loading...</p>
    </div>
  );
}
