import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import image from '../assets/image.png'
const SignupFormUser = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");

  const dataSending = async () => {
    const formData = {
      firstName: fullName,
      email: Email,
      password: password,
    };

    const response = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    if(data.success){
      navigate("/user/body");
    }
  };

  return (
    <div className="main_container">
                <div className="form_data">
                          
                <h2 style={{ textAlign: "center" }}>ENTER</h2>

                        <div className="form_row">   
                            <label>Password</label>
                            <input  type="text" name="firstName"  placeholder="Enter name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
    
                        <div className="form_row">
                            <label>E-Mail</label>
                            <input type="email" name="email" placeholder="Enter Email"  value={Email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        
                        <div className="form_row">   
                            <label>Password</label>
                            <input  type="password" name="password"  placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
    
                <button onClick={dataSending}> ENTER </button>
                </div>
    
                <div className="image_part">
                    <img src={image} alt="image" />
                </div>
        </div>
  );
};

export default SignupFormUser;