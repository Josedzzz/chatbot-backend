import express, { Application } from "express";
import { connectDb } from "./config/db";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import cors from "cors";

const app: Application = express();

// Cors validation
/* const allowedOrigins = [
  "http://localhost:5173",
  "https://chatbot-frontend-seven-theta.vercel.app",
  "http://chatbot-frontend-seven-theta.vercel.app/login",
]; */

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middlewares
app.use(express.json());

// Connection with the db
connectDb();

// Routes
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running:  http://localhost:${PORT}`);
});
