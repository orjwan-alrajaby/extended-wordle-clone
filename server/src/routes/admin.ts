import { Router } from "express";

import signup from "../controllers/auth/signup";

import validateInput from "../middlewares/validateInput";
import { loginSchema } from "../validation/user";

const router = Router();

router.post("/users/create", validateInput(loginSchema), signup(true));

export default router;