
// // src/components/BackButton.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react"; // ✅ nice left arrow icon
// import "../styles/components/BackButton.css";

// const BackButton = ({ className = "" }) => {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate(-1)}
//       className={`back-button-circle ${className}`}
//       aria-label="Go back"
//     >
//       <ArrowLeft size={18} strokeWidth={2.5} />
//     </button>
//   );
// };

// export default BackButton;


// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/components/BackButton.css";

const BackButton = ({ className = "", to = null }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to); // ✅ Go to specific path
    } else {
      navigate(-1); // ✅ Default: go back one page
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`back-button-circle ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={15} strokeWidth={2.5} />
    </button>
  );
};

export default BackButton;
