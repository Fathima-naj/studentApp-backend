import express from "express";
import { loginUser, registerUser } from "../controller/authController.js";
import validate from "../validators/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";


const router = express.Router();

router.post("/register", validate(registerSchema),registerUser);
router.post("/login",validate(loginSchema), loginUser);

export default router;