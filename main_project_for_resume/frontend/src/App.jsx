import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import LoginFormUser from "./components_login/EnterUser.jsx";
import SignupFormUser from "./signupComponents/RegisterUser.jsx";
import Body from "./bodyUser/Main.jsx";
import SignupFormDoctor from "./signupComponents/RegisterDoctor.jsx";
import LoginFormDoctor from "./components_login/EnterDoctor.jsx";
import UserDoctor from "./bodyUser/userDoctor.jsx";
import DoctorList from "./bodyUser/doctors.jsx";
import DoctorPage from "./bodyUser/doctorPage.jsx";
import { useParams } from "react-router-dom";
import { DoctorContext } from "./bodyUser/context.jsx";
import UserAppointmentPage from "./bodyUser/appointments.jsx";
import SelectTimeAndSlot from "./bodyUser/selectTimeAndSlot.jsx";
import DoctorBody from "./bodyDoctor/Main.jsx";
import DoctorAppointmentPage from "./bodyDoctor/appointments.jsx";
function App() {

  const context = useContext(DoctorContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<LoginFormUser />} />
        <Route path="/user/signup" element={<SignupFormUser />} />
        <Route path="/user/body" element={<Body />} />
        <Route path="/user/doctors" element={<UserDoctor />} />
        <Route path="/user/doctors/:type" element={<DoctorList />} />
        <Route path={`/user/doctors/${context.type}/:doctorname`} element={<DoctorPage />} />
        <Route path="/user/select-slot" element={<SelectTimeAndSlot />} />
        <Route path="/user/appointments" element={<UserAppointmentPage />} />


        <Route path="/doctor/signup" element={<SignupFormDoctor />} />
        <Route path="/doctor/login" element={<LoginFormDoctor />} />
        <Route path="/doctor/body" element={<DoctorBody />} />
        <Route path="/doctor/appointments" element={<DoctorAppointmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;