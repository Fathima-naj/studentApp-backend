import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controller/studentController.js";
import { getAllUsers } from "../controller/userController.js";

const router=express.Router();

router.use(authMiddleware,roleMiddleware('admin'));

router.post("/createStudent", createStudent);
router.get("/getStudent", getStudents);
router.get("/get/:id", getStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/getUser",getAllUsers);

export default router;