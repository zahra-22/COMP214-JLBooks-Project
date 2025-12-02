import express from "express";
import oracledb from "oracledb";

const router = express.Router();

// POST — Register a new book (Backend Developer #1)
router.post("/register", async (req, res) => {
  const { isbn, title, pubdate, pubid, cost, retail, discount, category } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    const dateStr = pubdate.trim().replace(/[\s\/]+/g, "-");

    await connection.execute(
      `BEGIN
         sp_Book_register(:isbn, :title, TO_DATE(:pubdate, 'YYYY-MM-DD'), :pubid, :cost, :retail, :discount, :category);
       END;`,
      { isbn, title, pubdate: dateStr, pubid, cost, retail, discount, category },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Book registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering book", error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// GET — List all books (Backend Developer #2)
router.get("/all", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(
      `SELECT isbn, title, pubdate, pubid, cost, retail, discount, category
       FROM jl_books
       ORDER BY isbn`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// POST — Update cost / retail / category (Backend Developer #2)

router.post("/update", async (req, res) => {
  // Accept both camelCase and snake_case key names
  const isbn = req.body.isbn;
  const new_cost = req.body.new_cost ?? req.body.newCost;
  const new_retail = req.body.new_retail ?? req.body.newRetail;
  const new_category = req.body.new_category ?? req.body.newCategory;

  if (!isbn) return res.status(400).json({ message: "ISBN is required" });

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `BEGIN
         sp_update_book_crc(:isbn, :new_cost, :new_retail, :new_category);
       END;`,
      {
        isbn,
        new_cost,
        new_retail,
        new_category,
      },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});


export default router;
