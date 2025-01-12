"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
/**
 * Middleware to validate JWT token
 */
const validateJwt = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json((0, response_1.errorResponse)("JWT_SECRET", "You need a JWT token"));
        return;
    }
    try {
        const secret = process.env.JWT_SECRET || "your_jwt_secret";
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res
            .status(401)
            .json((0, response_1.errorResponse)("JWT_ERROR", "Your session has expired, please login again"));
    }
};
exports.validateJwt = validateJwt;
