import express from "express";
import oracledb from "oracledb";

const router = express.Router();

// GET — List all books
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
    res.status(500).json({ message: "Error fetching books", error: err });
  } finally {
    if (connection) await connection.close();
  }
});

// POST — Update cost / retail / category
router.post("/update", async (req, res) => {
  const { isbn, newCost, newRetail, newCategory } = req.body;

  if (!isbn) return res.status(400).json({ message: "ISBN required" });

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `BEGIN 
         sp_update_book_crc(:isbn, :cost, :retail, :category);
       END;`,
      {
        isbn,
        cost: newCost,
        retail: newRetail,
        category: newCategory,
      }
    );

    res.json({ success: true, message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err });
  } finally {
    if (connection) await connection.close();
  }
});

export default router;
