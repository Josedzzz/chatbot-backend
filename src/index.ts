import express, { Application } from "express";
import { connectDb } from "./config/db";
import authRoutes from "./routes/authRoutes"

const app: Application = express();

// Middlewares
app.use(express.json());

// Connection with the db
connectDb();

// Routes
app.use("/auth", authRoutes);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running:  http://localhost/${PORT}`);
});
