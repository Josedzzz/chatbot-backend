import express, { Application } from "express";
import { connectDb } from "./config/db";

const app: Application = express();

// Middlewares
app.use(express.json());

// Connection with the db
connectDb();

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running:  http://localhost/${PORT}`);
});
