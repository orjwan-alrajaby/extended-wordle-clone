import { Router } from "express";

import signup from "../controllers/auth/signup";

import validateInput from "../middlewares/validateInput";
import { loginSchema } from "../validation/user";
import createThemes from "../controllers/admin/createThemes";
import createLevels from "../controllers/admin/createLevels";
import createWords from "../controllers/admin/createWords";

const router = Router();

router.post("/users/create", validateInput(loginSchema), signup(true));
router.post("/themes/create", createThemes);
router.post("/levels/create", createLevels);
router.post("/words/create", createWords);

export default router;