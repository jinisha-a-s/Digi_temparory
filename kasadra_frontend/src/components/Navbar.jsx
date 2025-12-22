import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/Navbar.css'; 


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg col-md-12 px-4">
            <div className="container-fluid">
                <h4 className="navbar-brand">Kasadra Learning Platform</h4>
                <div>
                    <Link to="/student-signup" className="auth-btn">Signup</Link>
                    <Link to="/student-signin" className="auth-btn">Sign in</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
