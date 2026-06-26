import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import image from '../assets/image.png'
const SignupFormDoctor = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [spec , setSpec] = useState("");
  const [qual , setQual] = useState("");
  const [exp, setExp] = useState("");
  const [hospitalName , setHospitalName] = useState("");
  const [add , setAdd] = useState("");


  const dataSending = async () => {
    const formData = {
      firstName: fullName,
      email: Email,
      password: password,
      phone : phone ,
      specialization : spec ,
      qualification : qual ,
      experience : Number(exp ),
      hospitalName : hospitalName ,
      address : add ,
    };

    const response = await fetch("http://localhost:8000/doctor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


    console.log(formData);
    const data = await response.json();
    console.log(data);

    if(data.success){
      navigate("/doctor/login");
    }
  };

  return (
    <div className="main_container">
                <div className="form_data">
                          
                <h2 style={{ textAlign: "center" }}>ENTER</h2>

                    <div className="form_row">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>E-Mail</label>
                        <input type="email" placeholder="Enter Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Phone</label>
                        <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Specialization</label>
                        <select
                            value={spec}
                            onChange={(e) => setSpec(e.target.value)}
                        >
                            <option value="">Select Specialization</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                        </select>
                    </div>

                    <div className="form_row">
                        <label>Qualification</label>
                        <input type="text" placeholder="Enter Qualification" value={qual} onChange={(e) => setQual(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Experience</label>
                        <input type="text" placeholder="Enter Experience" value={exp} onChange={(e) => setExp(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Hospital Name</label>
                        <input type="text" placeholder="Enter Hospital Name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                    </div>

                    <div className="form_row">
                        <label>Address</label>
                        <input type="text" placeholder="Enter Address" value={add} onChange={(e) => setAdd(e.target.value)} />
                    </div>
    
                <button onClick={dataSending}> ENTER </button>
                </div>
    
                <div className="image_part">
                    <img src={image} alt="image" />
                </div>
        </div>
  );
};

export default SignupFormDoctor;