import React from 'react'
import '../../styles/student/auth/Signup.css'; // adjust the path to your CSS file
import signupImage from '../../assets/signup.jpg'; // adjust the path
import { useState } from 'react';
import ToggleButton from '../../components/ToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerStudent } from '../../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput'; // Import the PasswordInput component`
import CloseButton from '../../components/CloseButton';


// Student Signup Page

const Signup = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    password: '',
    confirm_password: "",

  })
  const [error, setError] = useState('');
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone_no, password, confirm_password } = formData;

    // Validation

    if (!name || !email || !phone_no || !password || !confirm_password) {
      setError('Please fill all the fields');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      setError('*Name must contain only letters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone_no)) {
      setError('Enter a valid 10-digit phone number');
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError('Password must be at least 8 characters, include uppercase, lowercase, number & special character');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }


    dispatch(registerStudent(formData))
      .unwrap()
      .then((res) => {
        console.log('Registration success:', res);
        setSuccessMessage("Registration successful! Redirecting to login...");
        setError('');

        setTimeout(() => {
          navigate("/student-signin"); // adjust route if your login path is different
        }, 2000);

      })
      .catch((err) => {
        // err is always a string thanks to the thunk
        setError(err);
        setSuccessMessage("");
        console.error("Signup error:", err);
      });

  }
  return (
    <div>
      <div className='signup-container'>
        <div className='signup-mainbox'>

          <div className='signup-left'>
            <img src={signupImage} alt="Signup" className='signup-image' />

          </div>
          <div className='signup-right'>
            <div style={{ position: "relative" }}>
              <CloseButton />
            </div>
            <div className='signup-right-header'>
              <ToggleButton />
              {/* <button className='signup-btn-student'>Student</button>
              <button className='signup-btn-instructor'>Instructor</button> */}
            </div>
            <div className='signup-right-body'>
              <div className='signup-right-body-box'>
                <p className='signup-right-body-register-text'>Student Registration</p>
                <form className='signup-form' onSubmit={handleSubmit}>

                  <input type="text" data-testid="input-name" placeholder='Enter Name' className='signup-input-field' name='name' onChange={handleChange} value={formData.name} />
                  <input type="tel" data-testid="input-phone" placeholder='Enter Phone Number' className='signup-input-field' name='phone_no' onChange={handleChange} value={formData.phone_no} minLength="10" maxLength="10" />
                  <input type="text" data-testid="input-email" placeholder='Enter Email' className='signup-input-field' name='email' onChange={handleChange} value={formData.email} />
                  {/* <input type="text" placeholder='Enter Password' className='signup-input-field' name='password' onChange={handleChange} value={formData.password} />
                  <input type="text" placeholder='Confirm Password' className='signup-input-field' name='confirm_password' onChange={handleChange} value={formData.confirm_password} onPaste={(e) => e.preventDefault()} /> */}

                  <PasswordInput
                    name="password"
                    dataTestId="input-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Enter Password"
                  />

                  <PasswordInput
                    name="confirm_password"
                    dataTestId="input-confirm-password"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Confirm Password"
                    onPaste={(e) => e.preventDefault()} // disable paste
                  />

                  <br></br>
                  <button
                    className="signup-btn-submit"
                    data-testid="submit-button"
                    type="submit"
                    name="sign up"
                    disabled={loading} // disable while loading
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>

                  {/* <button className='signup-btn-submit' data-testid="submit-button" type='submit' name='sign up'>Sign Up</button>
                  <p></p> */}
                  <hr className='signup-line' />
                </form>

                {(error || successMessage) && (
                  <p
                    className={`${successMessage ? "signup-success-message" : "signup-error-message"
                      }`}
                    data-testid={successMessage ? "success" : "error"}
                  >
                    {successMessage || error}
                  </p>
                )}


                {/* {error && (
                  <p className="error-message" data-testid="error">
                    ⚠️ {error}
                  </p>
                )}

                {successMessage && !error && (
                  <p className="success-message">
                    🎉 {successMessage}
                  </p>
                )} */}

                <p className='signup-right-body-login-text'>
                  Returning User? <span></span><span></span>
                  <Link to="/student-signin" className='signup-signin-link'>
                    <b>Login Now</b>
                  </Link>
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div >
  )
}

export default Signup