import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import booksRoutes from "./routes/books.routes.js";

dotenv.config();

const app = express();
app.use(cors());

// Safe JSON parser — prevents crash when a request has no body
app.use((req, res, next) => {
  // GET requests never need JSON body
  if (req.method === "GET") return next();

  // Only parse JSON when request actually has JSON content
  if (req.headers["content-type"] && req.headers["content-type"].includes("application/json")) {
    return express.json()(req, res, next);
  }

  next();
});

// Routes
app.use("/api/books", booksRoutes);

// Home route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
