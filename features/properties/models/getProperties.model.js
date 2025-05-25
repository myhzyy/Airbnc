const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

exports.fetchProperties = async (queryParams) => {
  const { maxprice, minprice, sort, order, host } = queryParams;

  let query = `
    SELECT 
      properties.property_id, 
      properties.name AS property_name,
      properties.location,
      properties.price_per_night,
      CONCAT(users.first_name, ' ', users.surname) AS host,
      COUNT(favourites.favourite_id) AS favourite_count
    FROM properties
    JOIN users ON users.user_id = properties.host_id
    LEFT JOIN favourites ON properties.property_id = favourites.property_id
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

  query += " GROUP BY properties.property_id, users.user_id";
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
