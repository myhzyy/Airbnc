const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

exports.insertFavourite = async (property_id, guest_id) => {
  const propertyRes = await db.query(
    `SELECT * FROM properties WHERE property_id = $1`,
    [property_id]
  );

  if (propertyRes.rows.length === 0) {
    throw { status: 404, message: "Property not found" };
  }

  const guestRes = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
    guest_id,
  ]);

  if (guestRes.rows.length === 0) {
    throw { status: 404, message: "Guest not found" };
  }

  const query = format(
    `
    INSERT INTO favourites (property_id, guest_id)
    VALUES (%L, %L)
    RETURNING favourite_id;`,
    property_id,
    guest_id
  );

  if (propertyRes.rows.length === 0) {
    throw { status: 404, message: "Property not found" };
  }

  const { rows } = await db.query(query);

  return rows;
};
