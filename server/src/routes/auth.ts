import { Router } from "express";

import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";

import validateInput from "../middlewares/validateInput";
import { signUpSchema, loginSchema } from "../validation/user";

const router = Router();

router.post("/signup", validateInput(signUpSchema), signup);
router.post("/login", validateInput(loginSchema), login);

export default router;