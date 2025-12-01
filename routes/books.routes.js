import express from "express";
import oracledb from "oracledb";

const router = express.Router();

// POST — Register a new book (Backend Developer #1)
router.post("/register", async (req, res) => {
  // 1. Extract all required fields from the form (sent by frontend)
  const {
    isbn,
    title,
    pubdate,
    pubid,
    cost,
    retail,
    discount,
    category
  } = req.body;

   let connection;
   try {
    // 2. Connect to Oracle Database using environment variables
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    // 3. Call the stored procedure created in SQL Developer
    //    This will insert a new row into JL_BOOKS
    await connection.execute(
      `
      BEGIN
        sp_Book_register(
          :isbn,
          :title,
          :pubdate,
          :pubid,
          :cost,
          :retail,
          :discount,
          :category
        );
      END;
      `,
      {
        isbn,
        title,
        pubdate,
        pubid,
        cost,
        retail,
        discount,
        category,
      }
    );

    // 4. Send simple success message back to the frontend
    res.json({ success: true, message: "Book registered successfully" });

  } catch (err) {
    // 5. Handle any database or procedure errors
    res.status(500).json({
      message: "Error registering book",
      error: err
    });

  } finally {
    // 6. Always close the database connection
    if (connection) await connection.close();
  }
});

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
