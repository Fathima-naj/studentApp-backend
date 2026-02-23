import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cors from "cors"
import studentRouter from "./routes/studentRoutes.js"
import userRouter from "./routes/authRoutes.js"

dotenv.config();
const app=express();
connectDB();

const corOptions={
    origin:process.env.BASE_URL,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}
app.use(cors(corOptions))
app.use(express.json());
app.use('/api/user',userRouter)
app.use('/api/student',studentRouter)
app.listen(5000,()=>{
    console.log("server running...")
})