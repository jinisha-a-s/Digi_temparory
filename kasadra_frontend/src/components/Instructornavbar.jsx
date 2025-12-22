//src/components/InstructorNavbar.jsx

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { instructorLogout } from "../features/auth/instructorAuthSlice";
import "../styles/components/Instructornavbar.css"; // optional CSS

const Instructornavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 👈 state for hamburger menu

  const handleLogout = () => {
    dispatch(instructorLogout());
    navigate("/instructor-signin");
  };

  return (
    <nav className="instructor-navbar" data-testid="instructor-navbar">
      <h4 className="navbar-brand">Kasdra Learning Platform</h4>

      {/* Hamburger Menu Button (only visible on mobile) */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        data-testid="hamburger-menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links (toggle active on mobile) */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/instructor/home" className="navlink" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/contact" className="navlink" onClick={() => setMenuOpen(false)}>
          Contact us
        </Link>
        <button className="auth-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Instructornavbar;