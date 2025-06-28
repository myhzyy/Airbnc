const db = require("../../../db/connections/dbConnectionPool");

exports.fetchPropertiesSortedByPrice = async () => {
  const query = `
    SELECT * FROM properties
    ORDER BY price_per_night ASC;
  `;
  const { rows } = await db.query(query);
  console.log(rows);
  return rows;
};
