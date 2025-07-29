const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

const ENV = process.env.NODE_ENV || "production";

exports.fetchProperties = async (queryParams) => {
  const { maxprice, minprice, sort, order, host, amenity } = queryParams;

  let propertyId = null;

  if (amenity) {
    const amenitiesQuery = format(
      `
      SELECT 
      property_id
      FROM 
      properties_amenities
      WHERE amenity_slug = %L;
      `,
      amenity
    );

    const amenitiesDBQuery = await db.query(amenitiesQuery);
    propertyId = amenitiesDBQuery.rows.map((row) => row.property_id);

    if (propertyId.length === 0) {
      return [];
    }
  }

  let query = `
    SELECT 
      properties.property_id, 
      properties.name AS property_name,
      properties.location,
      properties.price_per_night,
      ${ENV === "dev" ? "properties.latitude, properties.longitude," : ""}
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
  `;

  let whereAdded = false;

  if (minprice) {
    query += format(" WHERE properties.price_per_night >= %L", minprice);
    whereAdded = true;
  }

  if (maxprice) {
    query += format(
      whereAdded
        ? " AND properties.price_per_night <= %L"
        : " WHERE properties.price_per_night <= %L",
      maxprice
    );
    whereAdded = true;
  }

  if (host) {
    query += format(
      whereAdded
        ? " AND properties.host_id = %L"
        : " WHERE properties.host_id = %L",
      host
    );
    whereAdded = true;
  }

  if (propertyId) {
    query += format(
      whereAdded
        ? " AND properties.property_id IN (%L)"
        : " WHERE properties.property_id IN (%L)",
      propertyId
    );
    whereAdded = true;
  }

  query += " GROUP BY properties.property_id, users.user_id, img.image_url";

  if (sort === "cost_per_night") {
    query += " ORDER BY properties.price_per_night";
  } else if (sort === "popularity") {
    query += " ORDER BY favourite_count";
  }

  if (order === "ascending") {
    query += " ASC;";
  } else if (order === "descending") {
    query += " DESC;";
  } else {
    query += ";";
  }

  const { rows } = await db.query(query);
  return rows;
};
