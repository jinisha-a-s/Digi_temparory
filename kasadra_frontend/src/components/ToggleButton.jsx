import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/ToggleButton.css"; // adjust the path to your CSS file

const ToggleButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <div className="login-container">
                <div className="user-toggle">
                    <button
                        className={
                            location.pathname === "/student-signup"
                                ? "toggle-btn active"
                                : "toggle-btn"
                        }
                        onClick={() => navigate("/student-signup")}
                    >
                        Student
                    </button>

                    <button
                        className={
                            location.pathname === "/instructor-signup"
                                ? "toggle-btn active"
                                : "toggle-btn"
                        }
                        onClick={() => navigate("/instructor-signup")}
                    >
                        Instructor
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToggleButton