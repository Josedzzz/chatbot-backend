import express from "express";
import { validateLogin, validateSignup } from "../middlewares/authValidation";
import { loginController, singUpController } from "../controllers/authController";

const router = express.Router();

router.post("/signup", validateSignup, singUpController);
router.post("/login", validateLogin, loginController);

export default router;
