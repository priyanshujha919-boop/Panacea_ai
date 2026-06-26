import React from "react";
import DoctorNavBar from "./nav";
import { useState, useEffect } from "react";
import "../bodyUser/doctorList.css";

const DoctorAppointmentPage = () => {
    const [getDoctorInfo, setGetDoctorInfo] = useState({});
    const [getAppointments, setGetAppointments] = useState([]);
    const [patientsMap, setPatientsMap] = useState({});

    const appointmentDoctor = async () => {
        try {
            const response = await fetch("http://localhost:8000/doctor/getdata", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) throw new Error("are you logged in ??");

            const data = await response.json();
            console.log("Logged-in doctor:", data);

            setGetDoctorInfo(data);

            const response1 = await fetch(
                `http://localhost:8000/appointments/doctor/${data._id}`,
                {
                    method: "GET",
                }
            );

            const appointmentsData = await response1.json();
            console.log("Doctor appointments:", appointmentsData);

            const appointmentsArray = appointmentsData.appointments;
            setGetAppointments(appointmentsArray);

            // fetch each patient's data once and store it keyed by patientId,
            // instead of fetching inside the render/map (that was overwriting
            // one shared state for every card)
            appointmentsArray.forEach((appointment) => {
                getPatientData(appointment.patientId);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const getPatientData = async (patientId) => {
        const response = await fetch(
            `http://localhost:8000/user/getdata/${patientId}`,
            {
                method: "GET",
            }
        );

        const data = await response.json();

        setPatientsMap((prevMap) => ({
            ...prevMap,
            [patientId]: data,
        }));
    };

    useEffect(() => {
        appointmentDoctor();
    }, []);

    return (
        <div>
            <DoctorNavBar />

            <div className="doctor-list-container">
                <h1>Dr. {getDoctorInfo?.firstName}'s Appointments</h1>

                <div className="doctor-list-grid">
                    {getAppointments.map((appointment) => {
                        const patientData = patientsMap[appointment.patientId];

                        return (
                            <div className="doctor-profile-card" key={appointment._id}>
                                <div className="doctor-avatar">
                                    {patientData?.firstName?.charAt(0)}
                                </div>

                                <h2>{patientData?.firstName}</h2>

                                <div className="doctor-info">
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {patientData?.email}
                                    </p>

                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {patientData?.location}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {appointment.status}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointmentPage;
