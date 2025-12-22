import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/Studentnavbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Studentnavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 👈 state for hamburger menu

  const handleLogout = () => {
    dispatch(logout());
    navigate("/student-login");
  };
  return (
    <nav className="navbar navbar-expand-lg col-md-12 px-4">
      <div className="container-fluid">
        <h4 className="navbar-brand">Kasadra Learning Platform</h4>

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

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link
            to="/student/home"
            className="auth-home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/student/contact"
            className="auth-contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
          <button className="auth-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Studentnavbar;
