import React, { useState, useEffect } from 'react';
import Studentnavbar from "../../../components/Studentnavbar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateInstructorProfile, clearEditProfileState } from '../../../features/student/myProfile/editProfileSlice';
import "../../../styles/student/myProfile/EditProfile.css";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get studentId from URL params or localStorage
    const { studentId: paramId } = useParams();
    const storedId = localStorage.getItem("studentId");
    const studentId = storedId || paramId;

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    const { loading, success, error } = useSelector((state) => state.editProfile);

    // ✅ Update success message when Redux state changes
    useEffect(() => {
        if (success) {
            setSuccessMessage("Profile updated successfully!");
            // Optional: auto-clear after 3 seconds
            const timer = setTimeout(() => {
                setSuccessMessage("");
                dispatch(clearEditProfileState());
                navigate(-1);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearEditProfileState());
        };
    }, [dispatch]);


    // ✅ Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    };

    // ✅ Validation function
    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "*Name is required.";
            valid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "*Name must contain only letters.";
            valid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "*Phone number is required.";
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "*Phone number must be exactly 10 digits.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // ✅ Handle save button
    const handleSave = (e) => {
        e.preventDefault();

        if (!studentId) {
            alert("Student ID not found!");
            return;
        }

        if (!validate()) return;

        const mappedData = {
            "Name": formData.name,
            "Phone No": formData.phone,
        };

        dispatch(updateInstructorProfile({ studentId, mappedData }));
        console.log("Saved data:", mappedData);
    };

    const handleCancel = () => {
        setFormData({ name: "", phone: "" });
        setErrors({ name: "", phone: "" });
        setSuccessMessage("");
    };

    // ✅ Check if form has any changes
    const isFormUnchanged = !formData.name && !formData.phone;

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-navbar">
                <Studentnavbar />
            </div>

            <div className="edit-profile-container">
                <div className="edit-profile-box">
                    <p className="edit-profile-title">Edit Profile</p>

                    <form onSubmit={handleSave} className="edit-profile-form">
                        <div className="edit-profile-field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                disabled={loading}
                            />
                            {errors.name && <p className="edit-profile-error">{errors.name}</p>}
                        </div>

                        <div className="edit-profile-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                maxLength="10"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone"
                                disabled={loading}
                            />
                            {errors.phone && <p className="edit-profile-error">{errors.phone}</p>}
                        </div>

                        <div className="edit-profile-buttons">
                            <button
                                type="submit"
                                className="edit-profile-save-btn"
                                disabled={loading || isFormUnchanged}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                                className="edit-profile-cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>

                        {/* ✅ Feedback messages */}
                        {successMessage && <p className="edit-profile-success">{successMessage}</p>}
                        {error && <p className="edit-profile-error">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
