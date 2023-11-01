import { User } from "../models/User";
import { Router } from "express";
const router = Router();
import { UserSchema } from "../validators/userValidator";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";

import {
  getAllUser,
  registerUser,
  loginUser,
} from "../controllers/userController";

//
router.get("/", getAllUser);
router.post("/", registerUser);
router.post("/login", loginUser);

//login

//
export { router as userRouter };
