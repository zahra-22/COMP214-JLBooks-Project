import express from "express";
import oracledb from "oracledb";

const router = express.Router();


router.post("/register", async (req, res) => {
  const {
    customerId,
    lastName,
    firstName,
    address,
    city,
    state,
    zip,
    referred,
    region,
    email
  } = req.body;

  if (!customerId || !lastName || !firstName) {
    return res.status(400).json({
      message: "Customer ID, First Name, and Last Name are required"
    });
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
         sp_client_register(
           :p_customerId,
           :p_lastName,
           :p_firstName,
           :p_address,
           :p_city,
           :p_state,
           :p_zip,
           :p_referred,
           :p_region,
           :p_email
         );
       END;`,
      {
        p_customerId: customerId,
        p_lastName: lastName,
        p_firstName: firstName,
        p_address: address,
        p_city: city,
        p_state: state,
        p_zip: zip,
        p_referred: referred,
        p_region: region,
        p_email: email
      },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Client registered successfully." });

  } catch (err) {
    console.error("Client Register Error:", err);
    res.status(500).json({ message: "Error registering client", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});


router.post("/update", async (req, res) => {
  const {
    customerId,
    lastName,
    firstName,
    address,
    city,
    state,
    zip,
    referred,
    region,
    email
  } = req.body;

  if (!customerId)
    return res.status(400).json({ message: "Customer ID is required" });

  let conn;
  try {
    conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    await conn.execute(
      `BEGIN
         sp_update_client(
           :p_customerId,
           :p_lastName,
           :p_firstName,
           :p_address,
           :p_city,
           :p_state,
           :p_zip,
           :p_referred,
           :p_region,
           :p_email
         );
       END;`,
      {
        p_customerId: customerId,
        p_lastName: lastName,
        p_firstName: firstName,
        p_address: address,
        p_city: city,
        p_state: state,
        p_zip: zip,
        p_referred: referred,
        p_region: region,
        p_email: email
      },
      { autoCommit: true }
    );

    res.json({ success: true, message: "Client updated successfully." });

  } catch (err) {
    console.error("Client Update Error:", err);
    res.status(500).json({ message: "Error updating client", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});


router.get("/all", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECT_STRING,
    });

    const result = await conn.execute(`
      SELECT
        "CUSTOMER#",
        LASTNAME,
        FIRSTNAME,
        ADDRESS,
        CITY,
        STATE,
        ZIP,
        REFERRED,
        REGION,
        EMAIL
      FROM jl_customers
      ORDER BY "CUSTOMER#" 
    `);

    res.json(result.rows);

  } catch (err) {
    console.error("Fetch Clients Error:", err);
    res.status(500).json({ message: "Error fetching clients", error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

export default router;
