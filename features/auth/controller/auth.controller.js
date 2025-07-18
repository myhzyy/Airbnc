const bcrypt = require("bcrypt");
const db = require("../../../db/connections/dbConnectionPool");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existing = await db.query(
      "SELECT * FROM auth_users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).send({ msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO auth_users (email, password_hash)
      VALUES ($1, $2)
      RETURNING auth_user_id, email;
    `;

    const result = await db.query(insertQuery, [email, hashedPassword]);

    res.status(201).send({ user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
