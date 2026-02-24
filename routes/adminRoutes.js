import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controller/studentController.js";

const router=express.Router();

router.use(authMiddleware,roleMiddleware('admin'));

router.post("/createStudent", createStudent);
router.get("/getStudent", getStudents);
router.get("/get/:id", getStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;