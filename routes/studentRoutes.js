import express from "express";
import {
  getOwnStudentData,
  updateOwnStudent,
} from "../controller/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware,roleMiddleware('user'));

router.get("/getStudent", getOwnStudentData);
router.get("/update",updateOwnStudent);

export default router;