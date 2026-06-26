import React, { useContext } from "react";
import { DoctorContext } from "./context";
import NavBar from "./nav";
import "./doctorList.css";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
    const doctorContext = useContext(DoctorContext);
    const navigate = useNavigate();
    return (
        <div className="doctor-list-page">
            <NavBar />

            <div className="doctor-list-container">
                <h1>Available Doctors</h1>

                <div className="doctor-list-grid">
                    {doctorContext.getDoc?.map((doctor) => (
                        <div className="doctor-profile-card" key={doctor._id}>
                            <div className="doctor-avatar">
                                {doctor.firstName.charAt(0)}
                            </div>

                            <h2>{doctor.firstName}</h2>

                            <div className="doctor-info">
                                <p>
                                    <strong>Specialization:</strong>{" "}
                                    {doctor.specialization}
                                </p>

                                <p>
                                    <strong>Qualification:</strong>{" "}
                                    {doctor.qualification}
                                </p>

                                <p>
                                    <strong>Experience:</strong>{" "}
                                    {doctor.experience} Years
                                </p>

                                <p>
                                    <strong>Hospital:</strong>{" "}
                                    {doctor.hospitalName}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {doctor.address}
                                </p>
                            </div>

                            <button className="appointment-btn" onClick={
                                ()=>{

                                    doctorContext.setDoctorInUse(doctor);
                                    navigate(`/user/doctors/Cardiologist/${doctor.firstName}`);
                                }

                                
                            }>
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;