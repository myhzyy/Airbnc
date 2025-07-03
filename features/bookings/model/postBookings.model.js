const db = require("../../../db/connections/dbConnectionPool");

exports.insertBooking = async (
  property_id,
  guest_id,
  check_in_date,
  check_out_date
) => {
  const query = `
    INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [property_id, guest_id, check_in_date, check_out_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};
