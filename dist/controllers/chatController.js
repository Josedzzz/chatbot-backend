"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistoryController = exports.chatHistoryController = exports.chatController = void 0;
const chatService_1 = require("../services/chatService");
const response_1 = require("../utils/response");
/**
 * Controller to handle chat interactions
 * @param req The request object
 * @param res The response object
 */
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, prompt } = req.body;
        if (!userId) {
            res
                .status(400)
                .json((0, response_1.errorResponse)("CHAT_ERROR", "Missing userId parameter"));
            return;
        }
        if (!prompt) {
            res.status(400).json((0, response_1.errorResponse)("CHAT_ERROR", "Missing prompt field"));
            return;
        }
        const response = yield (0, chatService_1.chatService)(prompt, userId);
        res
            .status(200)
            .json((0, response_1.successResponse)(response, "Message generated successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json((0, response_1.errorResponse)("CHAT_ERROR", `Chat interaction failed: ${error.message}`));
    }
});
exports.chatController = chatController;
/**
 * Controller to handle chat history retrieval
 * @param req The request object
 * @param res The response object
 */
const chatHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res
                .status(400)
                .json((0, response_1.errorResponse)("CHAT_ERROR", "Missing userId parameter"));
            return;
        }
        const chatHistory = yield (0, chatService_1.getChatHistory)(userId);
        res
            .status(200)
            .json((0, response_1.successResponse)(chatHistory, "Chat generated successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json((0, response_1.errorResponse)("CHAT_ERROR", `Failed to retrieve chat history: ${error.message}`));
    }
});
exports.chatHistoryController = chatHistoryController;
/**
 * Controller to clear the user's chat history
 * @param req The request object
 * @param res The response object
 */
const clearHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res
                .status(400)
                .json((0, response_1.errorResponse)("CHAT_ERROR", "Missing userId parameter"));
            return;
        }
        // Call the service to clear the user's chat history
        yield (0, chatService_1.clearHistory)(userId);
        // Respond with a success message
        res
            .status(200)
            .json((0, response_1.successResponse)("User chat history cleared successfully", "User chat history cleared successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json((0, response_1.errorResponse)("CHAT_ERROR", `Failed to clear chat history: ${error.message}`));
    }
});
exports.clearHistoryController = clearHistoryController;
