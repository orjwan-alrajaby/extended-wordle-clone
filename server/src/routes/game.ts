import { Router } from "express";
import startGame from "../controllers/game/startGame";
import getAvailableGameOptions from "../controllers/game/getAvailableGameOptions"

const router = Router();

router.get("/options/get", getAvailableGameOptions);
router.post("/start", startGame);

export default router;