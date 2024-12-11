import express from "express";
import { validateJwt } from "../middlewares/chatValidation";
import { chatController } from "../controllers/chatController";

const router = express.Router();

router.post("/message", validateJwt, chatController);

export default router;
