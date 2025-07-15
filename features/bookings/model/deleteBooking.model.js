const db = require("../../../db/connections/dbConnectionPool");

exports.removeBookingById = async (booking_id) => {
  const result = await db.query(
    "DELETE FROM bookings WHERE booking_id = $1 RETURNING *;",
    [booking_id]
  );

  return result.rows[0];
};
