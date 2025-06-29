const db = require("../../../db/connections/dbConnectionPool");

exports.fetchPropertiesSortedByPrice = async () => {
  const query = `
  SELECT 
  properties.property_id, 
  properties.name AS property_name,
  properties.location,
  properties.price_per_night,
  CONCAT(users.first_name, ' ', users.surname) AS host,
  COUNT(favourites.favourite_id) AS favourite_count,
  img.image_url AS image
FROM properties
JOIN users ON users.user_id = properties.host_id
LEFT JOIN favourites ON properties.property_id = favourites.property_id
LEFT JOIN LATERAL (
    SELECT image_url
    FROM images
    WHERE images.property_id = properties.property_id
    ORDER BY image_id ASC
    LIMIT 1
) img ON true
GROUP BY 
  properties.property_id,
  properties.name,
  properties.location,
  properties.price_per_night,
  users.first_name,
  users.surname,
  img.image_url
ORDER BY properties.price_per_night ASC;
`;
  const { rows } = await db.query(query);
  return rows;
};
