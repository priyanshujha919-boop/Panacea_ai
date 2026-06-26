const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connect = require("./connection");
const path = require("path");
const PORT = 8000;
const cors = require("cors");
const appointmentRouter = require("./routes/appointments");
const cokieParser = require("cookie-parser");

app.use(cokieParser());


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//Middlewares hai 

app.use(express.urlencoded({ extended: true }));


//ejs ko as view daal rahe hain
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// yhan pe rotes laa rahe hain

const userRouter = require("./routes/user");
const doctorRouter = require("./routes/doctor_router");
const aiRouter = require("./routes/ai_router");
const cookieParser = require("cookie-parser");

// using the routers

app.use("/user" , userRouter);
app.use("/doctor", doctorRouter);
app.get("/home" , (req,res) => {res.render("home.ejs")})
app.use("/appointments" , appointmentRouter);
app.use("/ai", aiRouter);

connect("mongodb://127.0.0.1:27017/resume_main")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Mongo Error:", err));


app.listen(PORT, () => {console.log(`Server Started at Port ${PORT}`);});