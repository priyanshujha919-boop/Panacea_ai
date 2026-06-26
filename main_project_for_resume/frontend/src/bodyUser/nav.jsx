import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ()=>{
    const navigate = useNavigate();
    return(
        <nav className="navbar">
            <div className="logo">
                Appointify
            </div>

            <ul className="nav-links">
                <li onClick={() => navigate("/user/body")}>Home</li>
                <li onClick={() => navigate("/user/doctors")}>Doctors</li>
                <li onClick={() => navigate("/user/appointments")}>Appointments</li>
                <li onClick={() => navigate("/about")}>About</li>
                <li onClick={() => navigate("/contact")}>Contact</li>
            </ul>

            <div className="nav-buttons">
                <button className="login-btn" onClick={() => navigate("/user/login")}>Login</button>
                <button className="signup-btn" onClick={() => navigate("/user/signup")}>Sign Up</button>
            </div>
        </nav>
    )
}

export default NavBar;