import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import booksRoutes from "./routes/books.routes.js";
import authorRoutes from "./routes/authors.routes.js";

dotenv.config();

const app = express();
app.use(cors());

// Safe JSON parser — prevents crashes if body is empty
app.use((req, res, next) => {
  if (req.method === "GET") return next();

  if (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("application/json")
  ) {
    return express.json()(req, res, next);
  }

  next();
});

// ROUTES
app.use("/api/books", booksRoutes);
app.use("/api/authors", authorRoutes); // <-- REQUIRED LINE

// Optional test route
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
