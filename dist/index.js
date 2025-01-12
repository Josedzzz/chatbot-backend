"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Cors validation
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// Middlewares
app.use(express_1.default.json());
// Connection with the db
(0, db_1.connectDb)();
// Routes
app.use("/auth", authRoutes_1.default);
app.use("/chat", chatRoutes_1.default);
// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running:  http://localhost:${PORT}`);
});
