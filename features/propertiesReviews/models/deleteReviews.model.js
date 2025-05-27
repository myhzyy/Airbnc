const db = require("../../../db/connections/dbConnectionPool");
const format = require("pg-format");

exports.deletePropertyReview = async (property_id) => {
  const { rows } = await db.query(
    `
  SELECT * from reviews WHERE property_id = $1`,
    [property_id]
  );

  if (rows.length === 0) {
    const err = new Error("No reviews found for the given property_id");
    err.status = 400;
    throw err;
  }

  await db.query("DELETE from reviews WHERE property_id = $1", [property_id]);

  return rows;
};
