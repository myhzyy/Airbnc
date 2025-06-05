const db = require("../../../db/connections/dbConnectionPool");
const format = require("pg-format");

exports.deletePropertyReview = async (review_id) => {
  const result = await db.query(
    `DELETE FROM reviews WHERE review_id = $1 RETURNING *;`,
    [review_id]
  );

  if (result.rowCount === 0) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }

  return result.rows[0];
};
