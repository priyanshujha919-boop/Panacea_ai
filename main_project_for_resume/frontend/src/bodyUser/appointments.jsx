import React from "react";
import NavBar from "./nav";
import { useState, useEffect } from "react";
import "./doctorList.css";

const UserAppointmentPage = () => {
    const [getAppointments, setGetAppointments] = useState([]);
    const [doctorsMap, setDoctorsMap] = useState({});

    const appointmentUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/getData", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) throw new Error("are you logged in ??");

            const data = await response.json();
            console.log("Logged-in user:", data);

            const response1 = await fetch(
                `http://localhost:8000/appointments/user/${data._id}`,
                {
                    method: "GET",
                }
            );

            const appointmentsData = await response1.json();
            console.log("User appointments:", appointmentsData);

            const appointmentsArray = appointmentsData.appointments;
             setGetAppointments(appointmentsArray);

             // fetch each doctor's data once and store it keyed by doctorId,
             // instead of fetching inside the render/map (that was overwriting
             // one shared state for every card)
             appointmentsArray.forEach((appointment) => {
                 getData(appointment.doctorId);
             });
        } catch (error) {
            console.log(error.message);
        }
    };

    const getData = async (doctorId) => {
        const response = await fetch(
            `http://localhost:8000/doctor/getdata/${doctorId}`,
            {
                method: "GET",
            }
        );

        const data = await response.json();

        setDoctorsMap((prevMap) => ({
            ...prevMap,
            [doctorId]: data.doctors,
        }));
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/appointments/cancel/${appointmentId}`,
                {
                    method: "PUT",
                }
            );

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Could not cancel appointment.");
            }

            alert("Appointment cancelled successfully!");
            appointmentUser();

        } catch (error) {
            console.log(error.message);
            alert(error.message || "Failed to cancel appointment. Please try again.");
        }
    };

    useEffect(() => {
        appointmentUser();
    }, []);

    return (
        <div>
            <NavBar />

            <div>
                {getAppointments.map((appointment) => {
                    const doctorData = doctorsMap[appointment.doctorId];

                    return (
                        <div className="doctor-profile-card" key={appointment._id}>
                            <div className="doctor-avatar">
                                {doctorData?.firstName?.charAt(0)}
                            </div>

                            <h2>{doctorData?.firstName}</h2>

                            <div className="doctor-info">
                                <p>
                                    <strong>Specialization:</strong>{" "}
                                    {doctorData?.specialization}
                                </p>

                                <p>
                                    <strong>Qualification:</strong>{" "}
                                    {doctorData?.qualification}
                                </p>

                                <p>
                                    <strong>Experience:</strong>{" "}
                                    {doctorData?.experience} Years
                                </p>

                                <p>
                                    <strong>Hospital:</strong>{" "}
                                    {doctorData?.hospitalName}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {doctorData?.address}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {appointment.status}
                                </p>
                            </div>

                            {appointment.status === "upcoming" && (
                                <button
                                    className="appointment-btn"
                                    onClick={() => cancelAppointment(appointment._id)}
                                >
                                    Cancel Appointment
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserAppointmentPage;