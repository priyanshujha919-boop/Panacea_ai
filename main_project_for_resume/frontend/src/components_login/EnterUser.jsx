import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import image from '../assets/image.png'

const LoginFormUser = () =>{

        const navigate = useNavigate();
      const [password, setPassword] = useState("");
      const [Email, setEmail] = useState("");
      const [data , setData] = useState({});

    const dataSending = async () => {
        const formData = {
        email: Email,
        password: password,
        };

        const response = await fetch("http://localhost:8000/user/enter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        });

        const returnData = await response.json();
        setData(returnData);

        if (returnData.success) {
            navigate("/user/body");
        }

    };



    return(
        <div className="main_container">
            <div className="form_data">
                {
                data.message && (data.success
                    ? <p>Entry was successful</p>
                    : <p>{data.message}</p>)
                }        
            <h2 style={{ textAlign: "center" }}>ENTER</h2>

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
    )
}

export default LoginFormUser