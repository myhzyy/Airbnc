const db = require("../../../db/connections/dbConnectionPool");
const format = require("pg-format");

exports.deletePropertyFavourite = async (property_id) => {
  const number = Number(property_id);

  if (Number.isNaN(number)) {
    throw {
      status: 400,
      message: "SENT body was NOT a valid. Try using a number.",
    };
  }

  const propertiesQuery = format(
    `
  SELECT * 
  from PROPERTIES 
  WHERE property_id = %L;`,
    property_id
  );

  const propertyRes = await db.query(propertiesQuery);

  if (propertyRes.rows.length === 0) {
    throw { status: 404, message: "Favourite not found" };
  }

  const query = format(
    `DELETE FROM favourites WHERE property_id = %L RETURNING *;`,
    property_id
  );

  const { rows } = await db.query(query);
  return rows;
};
