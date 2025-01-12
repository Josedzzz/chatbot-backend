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
exports.validateLogin = exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
const response_1 = require("../utils/response");
const User_1 = __importDefault(require("../models/User"));
/**
 * Middleware to validate the signup data form
 */
exports.validateSignup = [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Invalid email format")
        .bail()
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            throw new Error("Email is already in use");
        }
    })),
    (0, express_validator_1.check)("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters")
        .bail()
        .custom((username) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            throw new Error("Username is already in use");
        }
    })),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res
                .status(400)
                .json((0, response_1.errorResponse)("VALIDATION_ERROR", errors.array()[0].msg));
            return;
        }
        next();
    },
];
/**
 * Middleware to validate login data.
 */
exports.validateLogin = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res
                .status(400)
                .json((0, response_1.errorResponse)("VALIDATION_ERROR", errors.array()[0].msg));
            return;
        }
        next();
    },
];
