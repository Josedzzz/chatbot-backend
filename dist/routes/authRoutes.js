"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authValidation_1 = require("../middlewares/authValidation");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/signup", authValidation_1.validateSignup, authController_1.singUpController);
router.post("/login", authValidation_1.validateLogin, authController_1.loginController);
exports.default = router;
