const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

exports.fetchAmenities = async () => {
  const query = `
  SELECT * FROM amenities;`;

  const { rows } = await db.query(query);

  console.log(rows);
};
