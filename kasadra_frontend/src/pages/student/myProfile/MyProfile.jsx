import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../../features/student/myProfile/myProfileSlice";
import Studentnavbar from "../../../components/Studentnavbar";
import { FaUserEdit } from "react-icons/fa";
import BackButton from "../../../components/BackButton";
import "../../../styles/student/myProfile/MyProfile.css";

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { studentId: paramId } = useParams();
    const storedId = localStorage.getItem("studentId");
    const studentId = paramId || storedId;

    const { user, loading, error } = useSelector((state) => state.myProfile || {});

    useEffect(() => {
        if (studentId) {
            dispatch(fetchUserProfile(studentId));
        }
    }, [dispatch, studentId]);

    return (
        <div className="my-profile-container">
            {/* Navbar always visible */}
            <div className="my-profile-navbar">
                <Studentnavbar />
            </div>

            {/* Main content */}
            <div className="my-profile-content">
                {loading ? (
                    <div className="my-profile-status">Loading...</div>
                ) : error ? (
                    <div className="my-profile-status error">{error}</div>
                ) : !studentId ? (
                    <div className="my-profile-status">No student ID found. Please log in again.</div>
                ) : (
                    <div className="my-profile-page">
                        <div className="my-profile-header">
                             <BackButton />
                            <p className="my-profile-title">My Profile</p>
                           
                        </div>

                        <div className="my-profile-body">
                            {user ? (
                                <div className="my-profile-card">
                                    <div className="my-profile-icon">
                                        <span>👤</span>
                                        <FaUserEdit className="my-profile-edit-icon" onClick={() => { navigate(`/student/profile/${user.id}/edit`) }} />
                                    </div>
                                    <div className="my-profile-info">
                                        <div className="my-profile-row">
                                            <span className="my-profile-label">Name</span>
                                            <span className="my-profile-value">{user.name}</span>
                                        </div>
                                        <div className="my-profile-row">
                                            <span className="my-profile-label">Phone number</span>
                                            <span className="my-profile-value">{user.phone_no}</span>
                                        </div>
                                        <div className="my-profile-row">
                                            <span className="my-profile-label">Email</span>
                                            <span className="my-profile-value">{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="my-profile-status">Loading profile...</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* <button onClick={()=> {navigate("/student/checkout")}}>Course</button> */}
        </div>
    );
};

export default MyProfile;
