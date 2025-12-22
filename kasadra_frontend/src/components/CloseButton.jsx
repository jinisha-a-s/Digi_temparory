// src/components/CloseButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();

  // Reusable close button component
  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
      }}
      className="signup-close-button"
    >
      ×
    </button>

  );
};

export default CloseButton;
