const db = require("../../../db/connections/dbConnectionPool");

exports.fetchProperties = async (req, res, next) => {
  const query = `
  SELECT 
  properties.property_id, 
  properties.name AS property_name,
  properties.location,
  properties.price_per_night,
  CONCAT(users.first_name, ' ', users.surname) AS host
  FROM properties
  JOIN users ON users.user_id = properties.host_id;`;

  const { rows } = await db.query(query);
  return rows;
};
