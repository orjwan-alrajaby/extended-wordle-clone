import { Router } from "express";
import startGame from "../controllers/game/startGame";

const router = Router();

router.post("/start", startGame);

export default router;