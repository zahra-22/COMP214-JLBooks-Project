import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRoutes from "./routes/books.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", booksRoutes);

// Home route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
