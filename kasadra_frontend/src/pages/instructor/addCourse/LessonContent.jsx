import React from 'react'
import "../../../styles/instructor/addCourse/LessonContent.css";
import Instructornavbar from "../../../components/Instructornavbar";
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

// import CloseButton from '../../../components/CloseButton';

const LessonContent = () => {
    const navigate=useNavigate();
    const {lessonId}=useParams();
    const {courseId}=useParams();

    return (
        <div>
            <div className="lesson-content-page">
                <div className="lesson-content-navbar">
                    <Instructornavbar />
                </div>
                <div className="lesson-content-body">
                    <div className="lesson-content-header">
                        <BackButton to={`/courses/${courseId}/add-content`}/>
                        <h3 className="lesson-content-title">Select Content Type</h3>    
                    </div>
                    <div className="lesson-content-container">

                        <div className="lesson-content-card">
                           
                            <div className="lesson-content-grid">
                                <button className="lesson-content-btn" onClick={()=> navigate(`/instructor/${courseId}/${lessonId}/addpdf`)}>PDF</button>
                                <button className="lesson-content-btn" onClick={()=> navigate(`/instructor/${courseId}/${lessonId}/addweblink`)}>Weblink</button>
                                <button className="lesson-content-btn" onClick={()=> navigate(`/instructor/${courseId}/${lessonId}/notepad`)}>Notes</button>
                                <button className="lesson-content-btn">Concept</button>
                                <button className="lesson-content-btn" onClick={()=>navigate(`/instructor/${courseId}/${lessonId}/addquiz`)}>Quiz</button>
                                <button className="lesson-content-btn" onClick={()=>navigate(`/instructor/${courseId}/${lessonId}/addlab`)}>Lab</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonContent