import React , {useContext, useState}from "react";
import NavBar from "./nav";
import "./userDoctor.css";
import { useNavigate  } from "react-router-dom";
import { DoctorContext } from "./context";

const UserDoctor = () => {
    const doctorContext = useContext(DoctorContext);
    const navigate = useNavigate();

    const doctors = [
        "Cardiologist",
        "Neurologist",
        "Orthopedic",
        "Dermatologist",
        "Pediatrician"
    ];

    const [symptoms, setSymptoms] = useState("");
    const [aiResult, setAiResult] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

    const checkSymptoms = async () => {

        if (!symptoms.trim()) {
            setAiError("Please describe your symptoms first.");
            return;
        }

        setAiLoading(true);
        setAiError("");
        setAiResult(null);

        try {

            const response = await fetch("http://localhost:8000/ai/analyze-symptoms", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symptoms }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Could not analyze symptoms.");
            }

            setAiResult(data.analysis);

        } catch (error) {
            setAiError(error.message || "Something went wrong. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <div className="userDoctor">
            <NavBar />

            <div className="doctor-container">
                <h1>Find Your Specialist</h1>
                <p>
                    Choose the type of doctor you would like to consult with.
                </p>

                <div className="symptom-checker">
                    <h3>Not sure which doctor to pick?</h3>
                    <p>Describe your symptoms and let AI suggest a specialization.</p>

                    <textarea
                        className="symptom-textarea"
                        placeholder="e.g. I've had chest pain and shortness of breath for 2 days"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={3}
                    />

                    <button className="symptom-check-btn" onClick={checkSymptoms} disabled={aiLoading}>
                        {aiLoading ? "Analyzing..." : "Analyze Symptoms"}
                    </button>

                    {aiError && <p className="symptom-error">{aiError}</p>}

                    {aiResult && (
                        <div className="symptom-result">
                            <p><strong>Summary:</strong> {aiResult.summary}</p>
                            <p><strong>Suggested Specialist:</strong> {aiResult.specialization}</p>
                            <p><strong>Urgency:</strong> {aiResult.urgency}</p>
                        </div>
                    )}
                </div>

                <div className="doctor-grid">
                    {doctors.map((doctor, index) => (
                        <div className="doctor-card" key={index} >
                            <h3>{doctor}</h3>
                            <button value={doctor} onClick={

                                async ()=>{

                                    const response = await fetch("http://localhost:8000/doctor/home", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ doctor: doctor }),
                                    });

                                    const returnData = await response.json();
                                    console.log(returnData);
                                    doctorContext.setGetDoc(returnData.doctors);
                                    doctorContext.setType(doctor);
                                    navigate(`/user/doctors/${doctor}`);
                                }

                            }>Book Appointment</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDoctor;