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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistory = exports.chatService = exports.getChatHistory = void 0;
const gemini_1 = require("../config/gemini");
const User_1 = __importDefault(require("../models/User"));
const Chat_1 = __importDefault(require("../models/Chat"));
const response_1 = require("../utils/response");
/**
 * Retrieves the chat history of a user, creating a new chat if none exists
 * @param userId The ID of the user
 * @returns A promise containing the user's chat history
 */
const getChatHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield findUser(userId);
        let userChat = null;
        if (user.chat) {
            // Retrieve the existing chat
            userChat = yield Chat_1.default.findById(user.chat).exec();
        }
        if (!userChat) {
            // Create a new chat if none exists
            userChat = new Chat_1.default({
                userId: user._id,
                title: `${user.username}'s chat`,
                messages: [],
            });
            yield userChat.save();
            // Link the new chat to the user
            user.chat = userChat.id;
            yield user.save();
        }
        return userChat;
    }
    catch (error) {
        throw new Error(`Error retrieving chat history: ${error.message}`);
    }
});
exports.getChatHistory = getChatHistory;
/**
 * Handles the logic for interacting with the Gemini API
 * @param prompt The user input to send to the model
 * @param userId The ID of the user making the request
 * @returns A promise containing the model's response
 */
const chatService = (prompt, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield findUser(userId);
        let userChat = null;
        if (user.chat) {
            // Retrieve the existing chat
            userChat = yield Chat_1.default.findById(user.chat).exec();
        }
        if (!userChat) {
            // Create a new chat if none exists
            userChat = new Chat_1.default({
                userId: user._id,
                title: `${user.username}'s chat`,
                messages: [],
            });
            yield userChat.save();
            // Link the new chat to the user
            user.chat = userChat.id;
            yield user.save();
        }
        // Initialize Gemini chat
        const chat = gemini_1.model.startChat({
            history: userChat
                ? userChat.messages.map((msg) => ({
                    role: msg.sender === "user" ? "user" : "model", // Map user to 'user' role and bot to 'model'
                    parts: [{ text: msg.message }], // Wrap the message in 'parts' with a 'text' field
                }))
                : [], // If no chat exists, start with an empty history
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
        // Send the message to Gemini
        const result = yield chat.sendMessage(prompt);
        const response = result.response;
        const botMessage = response.text();
        // Update the chat with the new messages
        userChat.messages.push({ sender: "user", message: prompt, timestamp: new Date() }, { sender: "bot", message: botMessage, timestamp: new Date() });
        yield userChat.save();
        return botMessage;
    }
    catch (error) {
        throw new Error(`Gemini API error: ${error.message}`);
    }
});
exports.chatService = chatService;
/**
 * Clears the chat history of a user
 * @param userId The ID of the user whose chat history is to be cleared
 * @returns A promise indicating the operation is complete
 */
const clearHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield findUser(userId);
        if (!user.chat) {
            throw new Error("No chat found for the user.");
        }
        const userChat = yield Chat_1.default.findById(user.chat).exec();
        if (!userChat) {
            throw (0, response_1.errorResponse)("CHAT_NOT_FOUND", "Chat not found.");
        }
        // Clear the messages
        userChat.messages = [];
        yield userChat.save();
    }
    catch (error) {
        throw new Error(`Error clearing chat history: ${error.message}`);
    }
});
exports.clearHistory = clearHistory;
/**
 * Finds a user by ID
 * @param userId The ID of the user to find
 * @returns A promise containing the user
 */
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId).exec();
        if (!user)
            throw (0, response_1.errorResponse)("USER_NOT_REGISTERED", "User not registered");
        return user;
    }
    catch (error) {
        throw new Error(`UserId error: ${error.message}`);
    }
});
