import express from "express";
import oracledb from "oracledb";

const router = express.Router();

/**
 * POST /api/authors/register
 * Body: { authorId, lastName, firstName }
 * Calls Oracle procedure: sp_register_author(p_authorid, p_lname, p_fname)
 */
router.post("/register", async (req, res) => {
  const { authorId, lastName, firstName } = req.body;

  if (!authorId || !lastName || !firstName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let conn;
  try {
    conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await conn.execute(
      `BEGIN 
         sp_register_author(
           :p_authorid,
           :p_lname,
           :p_fname
         ); 
       END;`,
      {
        p_authorid: authorId,
        p_lname: lastName,
        p_fname: firstName,
      },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Author registered successfully." });
  } catch (err) {
    console.error("Register Author Error:", err);
    res
      .status(500)
      .json({ message: "Error registering author.", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

/**
 * POST /api/authors/assign
 * Body: { isbn, authorId }
 * Calls Oracle procedure: sp_assign_author_to_book(p_isbn, p_authorid)
 */
router.post("/assign", async (req, res) => {
  const { isbn, authorId } = req.body;

  if (!isbn || !authorId) {
    return res
      .status(400)
      .json({ message: "ISBN and Author ID are required" });
  }

  let conn;
  try {
    conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await conn.execute(
      `BEGIN
         sp_assign_author_to_book(
           :p_isbn,
           :p_authorid
         );
       END;`,
      {
        p_isbn: isbn,
        p_authorid: authorId,
      },
      { autoCommit: true }
    );

    res.json({
      success: true,
      message: "Author assigned to book successfully.",
    });
  } catch (err) {
    console.error("Assign Author Error:", err);
    res
      .status(500)
      .json({ message: "Error assigning author", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

/**
 * GET /api/authors/all
 * Returns all authors as JSON list
 */
router.get("/all", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    const result = await conn.execute(
      `
      SELECT
        AUTHORID,
        LNAME,
        FNAME
      FROM jl_author
      ORDER BY AUTHORID
    `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const authors = result.rows.map((row) => ({
      authorId: row.AUTHORID,
      lastName: row.LNAME,
      firstName: row.FNAME,
    }));

    res.json(authors);
  } catch (err) {
    console.error("Fetch Authors Error:", err);
    res
      .status(500)
      .json({ message: "Error fetching authors", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

export default router;
