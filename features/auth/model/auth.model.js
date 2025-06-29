const bcrypt = require("bcrypt");
const db = require("../../../db/connections/dbConnectionPool");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM auth_users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    res.send({
      msg: "Login successful",
      user: { auth_user_id: user.auth_user_id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
