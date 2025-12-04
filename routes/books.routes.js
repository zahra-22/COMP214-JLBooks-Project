import express from "express";
import oracledb from "oracledb";

const router = express.Router();

/* ============================================================
   REGISTER A NEW BOOK  (WITH LOGGING + ERROR TESTING)
   ============================================================ */
router.post("/register", async (req, res) => {

  // 🔍 DEBUG LOGS – CONFIRM ROUTE IS HIT
  console.log("📩 /register endpoint was triggered");
  console.log("📦 Request body received:", req.body);

  const { 
    isbn, 
    title, 
    pubDate,  // frontend camelCase
    pubId,    // frontend camelCase
    cost, 
    retail, 
    discount, 
    category 
  } = req.body;

  let connection;
  try {
    // Connect to Oracle
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    // Clean date input for Oracle
    const dateStr = pubDate ? pubDate.trim().replace(/[\s\/]+/g, "-") : null;

    console.log("📅 Parsed pubDate:", dateStr);

    // Execute stored procedure
    await connection.execute(
      `BEGIN
         sp_book_register(
           :isbn, 
           :title, 
           TO_DATE(:pubDate, 'YYYY-MM-DD'), 
           :pubId, 
           :cost, 
           :retail, 
           :discount, 
           :category
         );
       END;`,
      { isbn, title, pubDate: dateStr, pubId, cost, retail, discount, category },
      { autoCommit: true }
    );

    console.log("✅ Stored procedure executed successfully");

    res.json({ success: true, message: "Book registered successfully" });

  } catch (err) {
    // 🔥 ERROR LOGGING — THIS WILL SHOW EXACT ORACLE ISSUE
    console.error("🔥 BACKEND ERROR IN REGISTER:", err);

    res.status(500).json({
      message: "Error registering book",
      oracleError: err.message,
      stack: err.stack,
    });
  } finally {
    if (connection) await connection.close();
  }
});


/* ============================================================
   LIST ALL BOOKS
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

    res.json(result.rows);
  } catch (err) {
    console.error("🔥 BACKEND ERROR IN FETCH:", err);
    res.status(500).json({ message: "Error fetching books", error: err.message });
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
         COMP214_F25_ERS_3.SP_UPDATE_BOOK_CRC(:isbn, :cost, :retail, :category);
       END;`,
      { isbn, cost, retail, category },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Book updated successfully" });
  } catch (err) {
    console.error("🔥 BACKEND ERROR IN UPDATE:", err);
    res.status(500).json({ message: "Error updating book", error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

export default router;
