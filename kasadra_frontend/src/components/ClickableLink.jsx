import React from "react";

const ClickableLink = ({ label, value }) => {
  if (!value) return null;

  // CASE 1 — value is a URL string
  if (typeof value === "string") {
    const fileName = value.split("/").pop();

    return (
      <span>
        <strong>{label}:</strong>{" "}
        <a href={value} target="_blank" rel="noreferrer">
          {fileName || value}
        </a>
      </span>
    );
  }

  // CASE 2 — value is a File object
  if (value instanceof File) {
    return (
      <span>
        <strong>{label}:</strong> {value.name}
      </span>
    );
  }

  return null;
};

export default ClickableLink;
