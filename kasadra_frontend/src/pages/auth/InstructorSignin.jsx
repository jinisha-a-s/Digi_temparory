// src/pages/Auth/InstructorSignin.jsx

import React, { useState, useEffect } from 'react';
import '../../styles/student/auth/Signin.css';  // Create a separate CSS for instructor if needed
import loginImage from '../../assets/signup.jpg'; // You can use same image or another
import SigninToggle from '../../components/SigninToggle';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginInstructor, clearInstructorRegistrationState } from '../../features/auth/instructorAuthSlice.js'; // Instructor login slice
import PasswordInput from '../../components/PasswordInput'; // Same PasswordInput component
import CloseButton from '../../components/CloseButton'; // Reusable CloseButton component

const InstructorSignin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.instructorAuth
  );


  // Redux state
  // const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {

    }
  }, [isAuthenticated, navigate]);

  // Clear auth error when component mounts/unmounts
  useEffect(() => {
    return () => {
      dispatch(clearInstructorRegistrationState());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  console.log("Form Data:", formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // 🔹 Simple validations
    if (!email.trim() || !password.trim()) {
      setLocalError('Please fill in all fields');
      setSuccessMessage('');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setLocalError('Enter a valid email address');
      setSuccessMessage('');
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setLocalError('Password must be strong');
      return;
    }

    // Dispatch the instructor login action
    dispatch(loginInstructor(formData))
      .unwrap()
      .then((res) => {
        setSuccessMessage("Login successful! Redirecting...");
        setLocalError("");

        setTimeout(() => {
          navigate("/instructor", { replace: true });
        }, 800);
      })
      .catch((err) => {
        setLocalError(err);
        setSuccessMessage("");
      });

  };

  return (
    <div className="login-container-signin">
      <div className="login-mainbox">
        {/* <div >
          <CloseButton />
        </div> */}
        {/* Image Section */}
        <div className="right">

          <div className="login-right-image">

            <img src={loginImage} alt="Instructor Login" className="login-image" />
          </div>

        </div>

        {/* Form Section */}
        <div className="login-right">

          <div style={{ position: "relative", left: "380px" }}>
            <CloseButton />
          </div>
          <div className="login-right-header">
            <SigninToggle />
          </div>
          <div className="login-right-body-box">

            <p className="login-title">Instructor Login</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form-input">
                <input
                  type="text"
                  data-testid="input-email"
                  placeholder="Enter Email"
                  className="login-input-field"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <PasswordInput
                  name="password"
                  dataTestId="input-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
              <div className="login-forgot-password">
                <Link to="/instructor-forgot-password">Forgot password</Link>
              </div>
              <button
                className="login-btn-submit"
                data-testid="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <hr className="login-line" />
            </form>

            {(localError || error || successMessage) && (
              <p
                className={`${successMessage
                  ? "login-success-message"
                  : "login-error-message"
                  }`}
              >
                {successMessage || (localError !== error ? (localError || error) : error)}
              </p>
            )}

            <p className="login-footer-text">
              New here?{" "}
              <Link to="/instructor-signup" className="login-signin-link">
                <b>Register now.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSignin;
