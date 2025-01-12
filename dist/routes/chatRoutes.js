"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatValidation_1 = require("../middlewares/chatValidation");
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
router.post("/message", chatValidation_1.validateJwt, chatController_1.chatController);
router.post("/history/:userId", chatValidation_1.validateJwt, chatController_1.chatHistoryController);
router.delete("/clearhistory/:userId", chatValidation_1.validateJwt, chatController_1.clearHistoryController);
exports.default = router;
