import React from "react";
import { useContext } from "react";
import { DoctorContext } from "./context";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
    const context = useContext(DoctorContext);
    const navigate = useNavigate();

    if (!context || !context.doctorInUse) {
        return <div className="loading">Loading doctor details...</div>;
    }

    const { 
        firstName, 
        qualification, 
        specialization, 
        hospitalName, 
        experience, 
        location, 
        address, 
        email, 
        phone 
    } = context.doctorInUse;

    const BookingDoctor = () => {
        navigate("/user/select-slot");
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.name}>Dr. {firstName}</h1>
                <p style={styles.subtitle}>
                    {qualification ? qualification.toUpperCase() : ""} — {specialization}
                </p>
                <p style={styles.hospital}>@{hospitalName}</p>
            </header>

            <hr style={styles.divider} />

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h3>Experience</h3>
                    <p>{experience} Years Professional Practice</p>
                </div>
                <div style={styles.card}>
                    <h3>Region</h3>
                    <p>{location}</p>
                </div>
            </div>

            <section style={styles.section}>
                <h2>Practice Information</h2>
                <div style={styles.infoRow}>
                    <strong>Clinic Address:</strong> <span>{address}</span>
                </div>
            </section>

            <section style={styles.section}>
                <h2>Contact & Communication</h2>
                <div style={styles.infoRow}>
                    <strong>Email Address:</strong> <span>{email}</span>
                </div>
                <div style={styles.infoRow}>
                    <strong>Phone Number:</strong> <span>{phone}</span>
                </div>
            </section>

            <section style={styles.section}>
               <div style={styles.ButtonHolder} >
                    <button 
                        type="button" // Changed from submit since this isn't wrapped in a HTML form tag
                        style={styles.appointmentButton}
                        onClick={BookingDoctor}
                    > 
                        Select Time Slot & Book 
                    </button>
               </div>
            </section>
        </div>
    );
};

const styles = {
    ButtonHolder : {
        width : "100%",
        display : "flex",
        justifyContent : "center",
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
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        color: "#333",
        lineHeight: "1.6"
    },
    header: {
        marginBottom: "20px"
    },
    name: {
        fontSize: "2.5rem",
        color: "#1a365d",
        margin: "0 0 5px 0",
        textTransform: "capitalize"
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#4a5568",
        margin: "0 0 5px 0"
    },
    hospital: {
        fontSize: "1.1rem",
        color: "#3182ce",
        fontWeight: "bold",
        margin: 0,
        textTransform: "capitalize"
    },
    divider: {
        border: "0",
        height: "1px",
        background: "#e2e8f0",
        margin: "20px 0"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginBottom: "30px"
    },
    card: {
        background: "#f7fafc",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #edf2f7"
    },
    section: {
        marginBottom: "25px",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #f7fafc"
    }
};

export default DoctorPage;