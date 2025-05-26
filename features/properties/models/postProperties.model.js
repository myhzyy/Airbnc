const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

exports.insertPropertyReview = async (
  property_id,
  { guest_id, rating, comment }
) => {
  const query = format(
    `
    INSERT INTO reviews (property_id, guest_id, rating, comment)
    VALUES (%L, %L, %L, %L)
    RETURNING *;
    `,
    property_id,
    guest_id,
    rating,
    comment
  );

  const { rows } = await db.query(query);
  return rows[0];
};
