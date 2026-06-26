import React, { createContext, useState } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const [getDoc, setGetDoc] = useState([]);
  const [type, setType] = useState("");
  const [getParams , setGetParams] =useState();
  const [doctorInUse , setDoctorInUse] = useState({});
  const [selectedSlot , setSelectedSlot] = useState("");

  return (
    <DoctorContext.Provider value={{ getDoc, setGetDoc, type, setType ,getParams ,setGetParams , doctorInUse , setDoctorInUse , selectedSlot , setSelectedSlot }}>
      {children}
    </DoctorContext.Provider>
  );
};

