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
exports.loginService = exports.singUpService = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
/**
 * Handles the bussiness logic for creating a user
 * @param userData the userData to be saved in the database
 * @returns a promise to the created userObject
 */
const singUpService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
    const user = new User_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    return yield user.save();
});
exports.singUpService = singUpService;
/**
 * Handles the logic for log in a user and generating the JWT
 * @param email the email to find the user
 * @param password the password provided by the user
 * @returns a promise to the created JWT token
 */
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw (0, response_1.errorResponse)("USER_NOT_FOUND", "User not found");
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw (0, response_1.errorResponse)("INVALID_PASSWORD", "Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "8h" });
    return { token, user };
});
exports.loginService = loginService;
