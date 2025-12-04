import express from "express";
import oracledb from "oracledb";

const router = express.Router();

/* ============================================================
   REGISTER A NEW BOOK  (WITH LOGGING + ERROR TESTING)
   ============================================================ */
router.put("/update", async (req, res) => {
  const { isbn, cost, retail, category } = req.body;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `BEGIN
         COMP214_F25_ERS_3.SP_UPDATE_BOOK_CRC(
           :isbn, 
           :cost, 
           :retail, 
           :category
         );
       END;`,
      { isbn, cost, retail, category },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Book updated successfully" });
  } catch (err) {
    console.error("ERROR IN UPDATE:", err);
    res
      .status(500)
      .json({ message: "Error updating book", error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});



/* ============================================================
   LIST ALL BOOKS  (FIXED FOR FRONTEND LOWERCASE KEYS)
   ============================================================ */
router.get("/all", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(
      `SELECT isbn, title, TO_CHAR(pubdate, 'YYYY-MM-DD') AS pubdate,
              pubid, cost, retail, discount, category
       FROM jl_books
       ORDER BY isbn`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Transform Oracle UPPERCASE keys → lowercase names for React
    const books = result.rows.map(row => ({
      isbn: row.ISBN,
      title: row.TITLE,
      pubdate: row.PUBDATE,
      pubid: row.PUBID,
      cost: row.COST,
      retail: row.RETAIL,
      category: row.CATEGORY
    }));

    res.json(books);

  } catch (err) {
    console.error(" ERROR FETCHING BOOKS:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: err.message
    });
  } finally {
    if (connection) await connection.close();
  }
});


/* ============================================================
   UPDATE cost / retail / category
   ============================================================ */
router.put("/update", async (req, res) => {
  const { isbn, cost, retail, category } = req.body;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required" });
  }

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `BEGIN
         COMP214_F25_ERS_3.SP_UPDATE_BOOK_CRC(
           :isbn, :cost, :retail, :category
         );
       END;`,
      { isbn, cost, retail, category },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Book updated successfully" });

  } catch (err) {
    console.error(" ERROR IN UPDATE:", err);
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: err.message
    });
  } finally {
    if (connection) await connection.close();
  }
});

export default router;
