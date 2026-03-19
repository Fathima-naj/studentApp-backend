import express from "express";
import {
  getOwnStudentData,
  updateOwnStudent,
} from "../controller/studentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import validate from "../validators/validate.js";
import { updateStudentSchema } from "../validators/studentValidator.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("user"));

router.get("/getStudent", getOwnStudentData);

router.put(
  "/update",
  upload.single("profileImage"),   
  validate(updateStudentSchema),   
  updateOwnStudent
);

export default router;