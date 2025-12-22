import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/SigninToggle.css"; // adjust the path to your CSS file

const SigninToggle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <div className="login-container">
                <div className="user-toggle">
                    <button
                        className={
                            location.pathname === "/student-signin"
                                ? "toggle-btn active"
                                : "toggle-btn"
                        }
                        onClick={() => navigate("/student-signin")}
                    >
                        Student
                    </button>

                    <button
                        className={
                            location.pathname === "/instructor-signin"
                                ? "toggle-btn active"
                                : "toggle-btn"
                        }
                        onClick={() => navigate("/instructor-signin")}
                    >
                        
                        Instructor
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SigninToggle
