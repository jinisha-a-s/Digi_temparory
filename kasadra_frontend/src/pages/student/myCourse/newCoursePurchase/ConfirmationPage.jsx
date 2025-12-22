import React from 'react'
import "../../../../styles/student/myCourse/newCoursePurchase/ConfirmationPage.css"
import success_course from "../../../../assets/success_course.jpg"
import Studentnavbar from '../../../../components/Studentnavbar'
import { useNavigate } from 'react-router-dom';


const ConfirmationPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/student/home'); // Assuming '/' is your Home page route
  };
  return (
    <div>
      <div className="confirmation-page-container">
        <div className="confirmation-page-navabar">
        <Studentnavbar/>
        </div>
        <div className="confirmation-page">
          <div className="confirmation-page-header">

          </div>
          <div className="confirmation-page-body">
            <img
              className="confirmation-page-image"
              src={success_course}
              alt="Enrollment Success"
            />
            <h2 className="confirmation-page-message">
              🚀 <span>Success! You're Now Enrolled and Ready to Level Up!</span>
            </h2>
            <button
              className="confirmation-page-button"
              onClick={goToHome}
            >
              Start Learning →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage