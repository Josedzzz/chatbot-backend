import express from "express";
import { validateJwt } from "../middlewares/chatValidation";
import { chatController, chatHistoryController, clearHistoryController } from "../controllers/chatController";

const router = express.Router();

router.post("/message", validateJwt, chatController);
router.post("/history/:userId", validateJwt, chatHistoryController);
router.delete("/clearhistory/:userId", validateJwt, clearHistoryController);

export default router;
