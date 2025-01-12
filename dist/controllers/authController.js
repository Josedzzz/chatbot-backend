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
exports.loginController = exports.singUpController = void 0;
const authService_1 = require("../services/authService");
const response_1 = require("../utils/response");
/**
 * Handles user singup request
 * @param req the http request object
 * @param res the http response object
 */
const singUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = yield (0, authService_1.singUpService)(req.body);
        res.status(201).json((0, response_1.successResponse)(user, "User created successfully"));
    }
    catch (error) {
        res
            .status(400)
            .json((0, response_1.errorResponse)(((_a = error.error) === null || _a === void 0 ? void 0 : _a.code) || "SIGNUP_ERROR", ((_b = error.error) === null || _b === void 0 ? void 0 : _b.message) || "Signup failed"));
    }
});
exports.singUpController = singUpController;
/**
 * Handles the login request
 * @param req the http request object
 * @param res the http response object
 */
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        const { token, user } = yield (0, authService_1.loginService)(email, password);
        res.status(200).json((0, response_1.successResponse)({ token, user }, "Login successful"));
    }
    catch (error) {
        res
            .status(400)
            .json((0, response_1.errorResponse)(((_a = error.error) === null || _a === void 0 ? void 0 : _a.code) || "LOGIN_ERROR", ((_b = error.error) === null || _b === void 0 ? void 0 : _b.message) || "Login failed"));
    }
});
exports.loginController = loginController;
