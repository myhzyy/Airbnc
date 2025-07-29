const db = require("../../../db/connections/dbConnectionPool");

exports.fetchPropertyId = async (property_id, user_id) => {
  const query = `
    SELECT 
      properties.property_id,
      properties.name AS property_name,
      properties.location,
      properties.price_per_night,
      properties.description,
      properties.latitude,
      properties.longitude,
      users.user_id AS host,
      users.avatar AS host_avatar,
      COUNT(favourites.favourite_id) AS favourite_count
    FROM properties
    JOIN users ON properties.host_id = users.user_id
    LEFT JOIN favourites ON properties.property_id = favourites.property_id
    WHERE properties.property_id = $1
    GROUP BY properties.property_id, users.user_id, users.avatar
  `;

  const { rows } = await db.query(query, [property_id]);
  const propertyData = rows[0];

  const imgRes = await db.query(
    `
    SELECT image_url FROM images 
    WHERE property_id = $1 
    ORDER BY image_id ASC
    `,
    [property_id]
  );

  const imageUrls = imgRes.rows.map((row) => row.image_url);

  if (user_id) {
    const favRes = await db.query(
      `SELECT * FROM favourites WHERE guest_id = $1 AND property_id = $2`,
      [user_id, property_id]
    );

    return {
      ...propertyData,
      favourited: favRes.rows.length > 0,
      images: imageUrls,
    };
  }

  return {
    ...propertyData,
    images: imageUrls,
  };
};
