import express, { Application } from "express";

const app: Application = express();

// Middlewares
app.use(express.json());

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running:  http://localhost/${PORT}`);
});
