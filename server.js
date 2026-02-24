// import express from "express"
// import dotenv from "dotenv"
// import connectDB from "./config/db.js"
// import cors from "cors"
// import studentRouter from "./routes/studentRoutes.js"
// import userRouter from "./routes/authRoutes.js"

// dotenv.config();
// const app=express();
// connectDB();

// const corOptions={
//     origin:process.env.BASE_URL,
//     methods:["GET","POST","PUT","PATCH","DELETE"],
//     credentials:true
// }
// app.use(cors(corOptions))
// app.use(express.json());
// app.use('/api/user',userRouter)
// app.use('/api/student',studentRouter)
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import studentRouter from "./routes/studentRoutes.js";
import userRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();

connectDB();

// ✅ Allow local frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});