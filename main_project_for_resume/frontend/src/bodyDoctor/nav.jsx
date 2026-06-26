import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorNavBar = ()=>{
    const navigate = useNavigate();
    return(
        <nav className="navbar">
            <div className="logo">
                Appointify
            </div>

            <ul className="nav-links">
                <li onClick={() => navigate("/doctor/body")}>Home</li>
                <li onClick={() => navigate("/doctor/appointments")}>Appointments</li>
                <li onClick={() => navigate("/about")}>About</li>
                <li onClick={() => navigate("/contact")}>Contact</li>
            </ul>

            <div className="nav-buttons">
                <button className="login-btn" onClick={() => navigate("/doctor/login")}>Login</button>
                <button className="signup-btn" onClick={() => navigate("/doctor/signup")}>Sign Up</button>
            </div>
        </nav>
    )
}

export default DoctorNavBar;
