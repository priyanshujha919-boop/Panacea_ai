import React, { useContext, useState } from "react";
import { DoctorContext } from "./context";
import NavBar from "./nav";
import { useNavigate } from "react-router-dom";

const SelectTimeAndSlot = () => {
    const context = useContext(DoctorContext);
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    if (!context || !context.doctorInUse || !context.doctorInUse._id) {
        return <div className="loading">Loading doctor details...</div>;
    }

    const timeSlots = [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
    ];

    const upcomingDates = Array.from({ length: 5 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date.toDateString();
    });

    const confirmBooking = async () => {
        if (!selectedDate || !selectedSlot) {
            alert("Please select both a date and a time slot.");
            return;
        }

        try {

            const response = await fetch("http://localhost:8000/user/getData", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to fetch user data. Are you logged in?");

            const data = await response.json();
            console.log("Logged-in user:", data);

            const response2 = await fetch("http://localhost:8000/appointments/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorId: context.doctorInUse._id,
                    patientId: data._id,
                })
            });

            if (!response2.ok) {
                throw new Error(`Server error: ${response2.status}`);
            }

            const data2 = await response2.json();
            console.log("Booking successful:", data2);
            alert(`Appointment booked for ${selectedDate} at ${selectedSlot}!`);

            const userData = {
                patientId: data._id,
                doctorId: context.doctorInUse._id,
            };

            const response3 = await fetch("http://localhost:8000/appointments/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            });

            const data3 = await response3.json();
            console.log("User tracking updated:", data3);

            navigate("/user/appointments");

        } catch (error) {
            console.error("Error booking doctor:", error);
            alert(error.message || "Failed to book appointment. Please try again.");
        }
    };

    return (
        <div>
            <NavBar />

            <div style={styles.container}>
                <h1 style={styles.heading}>
                    Pick a slot with Dr. {context.doctorInUse.firstName}
                </h1>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Select Date</h2>
                    <div style={styles.optionsRow}>
                        {upcomingDates.map((date) => (
                            <button
                                key={date}
                                style={
                                    selectedDate === date
                                        ? styles.optionButtonActive
                                        : styles.optionButton
                                }
                                onClick={() => setSelectedDate(date)}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.subHeading}>Select Time Slot</h2>
                    <div style={styles.optionsRow}>
                        {timeSlots.map((slot) => (
                            <button
                                key={slot}
                                style={
                                    selectedSlot === slot
                                        ? styles.optionButtonActive
                                        : styles.optionButton
                                }
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </section>

                <div style={styles.ButtonHolder}>
                    <button
                        type="button"
                        style={styles.appointmentButton}
                        onClick={confirmBooking}
                    >
                        Confirm Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        color: "#333",
        lineHeight: "1.6"
    },
    heading: {
        fontSize: "2rem",
        color: "#1a365d",
        marginBottom: "20px",
        textTransform: "capitalize"
    },
    subHeading: {
        fontSize: "1.2rem",
        color: "#4a5568",
        marginBottom: "12px"
    },
    section: {
        marginBottom: "25px",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    optionsRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
    },
    optionButton: {
        backgroundColor: "#f7fafc",
        color: "#333",
        border: "1px solid #e2e8f0",
        padding: "10px 16px",
        fontSize: "0.95rem",
        borderRadius: "6px",
        cursor: "pointer",
    },
    optionButtonActive: {
        backgroundColor: "#3182ce",
        color: "#fff",
        border: "1px solid #3182ce",
        padding: "10px 16px",
        fontSize: "0.95rem",
        fontWeight: "bold",
        borderRadius: "6px",
        cursor: "pointer",
    },
    ButtonHolder: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    appointmentButton: {
        backgroundColor: "#3182ce",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },
};

export default SelectTimeAndSlot;
