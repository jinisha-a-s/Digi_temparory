import React, { useState, useEffect } from "react";
import "../../styles/student/auth/Signin.css";
import loginImage from "../../assets/signup.jpg";
import SigninToggle from "../../components/SigninToggle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent, clearAuthState } from "../../features/auth/authSlice.js";
import PasswordInput from "../../components/PasswordInput";
import CloseButton from "../../components/CloseButton";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState(""); // local validation error
  const [successMessage, setSuccessMessage] = useState("");

  // console.log("Signin Rendered");
  // console.log("Current Form Data:", formData);
  // console.log("Local Error:", localError);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/student-dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear auth error when component mounts/unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // 🔹 Simple validations
    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill in all fields");
      setSuccessMessage("");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setLocalError("Enter a valid email address");
      setSuccessMessage("");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setLocalError("Password must be strong");
      setSuccessMessage("");
      return;
    }

    // 🔹 Dispatch login thunk
    dispatch(loginStudent(formData))
      .unwrap()
      .then((res) => {
        setSuccessMessage("Login successful! Redirecting...");
        console.log("Login Data:", res); // {id, studentName, token, tokenType}
        setLocalError("");
        setTimeout(() => {
          navigate("/student/my-course")
        }, 2000)
      })
      .catch((err) => {
        // `err` is now always a string thanks to slice
        setLocalError(err);
        setSuccessMessage("");
        console.error("Login error:", err);
      });
  };

  return (
    <div className="login-container-signin">
      <div className="login-mainbox">
        {/* Image Section */}
        <div className="login-right-part">
          {/* <div >
            <CloseButton />
          </div> */}
          <div className="login-right-image">
            <img src={loginImage} alt="Login" className="login-image" />
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
            <p className="login-title">Student Login</p>
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
                <Link to="/forgot-password">Forgot password</Link>
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
                data-testid="auth-message"
                className={`${successMessage ? "login-success-message" : "login-error-message"
                  }`}
              >
                {successMessage || (localError !== error ? (localError || error) : error)}
              </p>
            )}



            {/* Error Messages */}
            {/* {localError && (
              <p className="login-error-message">⚠️ {localError}</p>
            )} */}
            {/* {error && <p className="login-error-message">⚠️ {error}</p>} */}

            {/* Success Message */}
            {/* {successMessage && (
              <p className="login-success-message">{successMessage}</p>
            )} */}

            <p className="login-footer-text">
              New here?{" "}
              <Link to="/student-signup" className="login-signin-link">
                <b>Register now.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
