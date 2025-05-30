const format = require("pg-format");
const db = require("../../../../db//connections/dbConnectionPool");

exports.fetchPatchUserId = async (user_id, updateData) => {
  const allowedFields = ["first_name", "surname", "email"];

  const filteredEntries = Object.entries(updateData).filter(([key]) => {
    return allowedFields.includes(key);
  });

  if (filteredEntries.length === 0) {
    throw { status: 404, msg: "Invalid update field(s)" };
  }

  const fields = filteredEntries.map(([key]) => key);
  const values = filteredEntries.map(([, value]) => value);

  // const fields = Object.keys(updateData);
  // const values = Object.values(updateData);

  const setClause = fields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");

  let query = format(`
  UPDATE users
  SET ${setClause}
  WHERE user_id = $1
  RETURNING*;`);

  const { rows } = await db.query(query, [user_id, ...values]);

  if (rows.length === 0) throw { status: 404, msg: "User not found" };

  return rows;
};
