import express from "express";
import {
  getOwnStudentData,
  updateOwnStudent,
} from "../controller/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.use(authMiddleware,roleMiddleware('user'));

router.get("/getStudent", getOwnStudentData);
router.put("/update",updateOwnStudent,upload.single("profileImage"));

export default router;