import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import studentRouter from "./routes/studentRoutes.js";
import userRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "https://student-app-frontend-phi.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);

// 404 Handler 
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    data: null
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});