const db = require("../../../db/connections/dbConnectionPool");
const format = require("pg-format");

exports.deletePropertyFavourite = async (id, user_id) => {
  const propertyId = Number(id);
  const userId = Number(user_id);

  if (Number.isNaN(propertyId) || Number.isNaN(userId)) {
    throw { status: 400, message: "Invalid property_id or user_id" };
  }

  const favouriteQuery = format(
    `
    SELECT
  *
  FROM favourites
  WHERE property_id = %L AND favourite_id = %L;
  `,
    propertyId,
    userId
  );

  const favouriteQueryRows = await db.query(favouriteQuery);

  if (favouriteQueryRows.rows.length < 1) {
    throw { status: 404, message: "Favourite not found" };
  }
  const query = format(
    `
  DELETE FROM 
  favourites 
  WHERE property_id = %L 
  AND guest_id = %L
  RETURNING *;
  `,
    propertyId,
    userId
  );

  const { rows } = await db.query(query);

  return rows;
};
