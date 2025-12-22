import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../styles/components/PasswordInput.css';

const PasswordInput = ({ value, onChange, placeholder, name, onPaste, dataTestId }) => {
    const [showPassword, setShowPassword] = useState(false);
    
   
    
    return (
        <div className="password-wrapper">
            <input
                type={showPassword ? "text" : "password"}
                className="signup-input-field"
                placeholder={placeholder} // use the prop so you can customize
                value={value} // controlled component
                name={name} // so formData updates correctly
                onChange={onChange} // pass the change handler
                onPaste={onPaste} // so you can disable paste for confirm password
                data-testid={dataTestId}
            />
            <span
                className="toggle-password"
                data-testid="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
    );
};

export default PasswordInput;
