const db = require("../../../db/connections/dbConnectionPool");

exports.fetchPropertyId = async (req, res, next) => {
  const query = `
  SELECT 
  properties.property_id,
  properties.name AS property_name,
  properties.location,
  properties.price_per_night,
  properties.description,
  users.user_id AS host,
  users.avatar AS host_avatar,
  COUNT(favourites.favourite_id) AS favourite_count
  
  FROM properties
  JOIN users ON properties.host_id = users.user_id
  LEFT JOIN favourites ON properties.property_id = favourites.property_id

  GROUP BY properties.property_id,
  users.user_id,
  users.avatar;
  `;

  const { rows } = await db.query(query);
};
