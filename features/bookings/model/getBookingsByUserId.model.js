const db = require("../../../db/connections/dbConnectionPool");

exports.getBookingsByUserId = async (user_id) => {
  const query = `
    SELECT * FROM bookings
    WHERE guest_id = $1
    ORDER BY check_in_date ASC;
  `;

  const values = [user_id];
  const { rows } = await db.query(query, values);
  return rows;
};
