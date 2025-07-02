const db = require("../../../db/connections/dbConnectionPool");

exports.selectAmenitiesByPropertyId = async (property_id) => {
  const query = `
    SELECT a.amenity
    FROM properties_amenities pa
    JOIN amenities a ON pa.amenity_slug = a.amenity
    WHERE pa.property_id = $1;
  `;

  const { rows } = await db.query(query, [property_id]);
  return rows;
};
