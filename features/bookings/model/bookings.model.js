const format = require("pg-format");
const db = require("../../../db/connections/dbConnectionPool");

exports.fetchBookings = async (property_id) => {
  const propertiesQuery = format(
    `
    SELECT
    property_id
    FROM properties
    WHERE property_id = %L
    `,
    [property_id]
  );

  const propertiesDbQuery = await db.query(propertiesQuery);

  if (propertiesDbQuery.rows.length < 1) {
    throw { status: 404, message: "PropertyId not found" };
  }

  let query = format(
    `
  SELECT 
  booking_id,
  check_in_date,
  check_out_date,
  created_at
  FROM 
  bookings
  WHERE 
  property_id = %L   
  ORDER BY check_in_date ASC;`,
    [property_id]
  );

  const { rows } = await db.query(query);
  const bookingsData = { rows, property_id: property_id };
  return bookingsData;
};
