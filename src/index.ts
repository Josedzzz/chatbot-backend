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
    origin: (origin, callback) => {
      // Allow all origins for now, with a console log to debug the request origin
      console.log(`Incoming Origin: ${origin}`);
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allows cookies if needed
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
