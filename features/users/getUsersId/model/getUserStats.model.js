const db = require("../../../../db/connections/dbConnectionPool");

exports.getUserStats = async (user_id) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM bookings WHERE guest_id = $1) AS trips,
      (SELECT COUNT(*) FROM reviews WHERE guest_id = $1) AS reviews;
  `;

  const { rows } = await db.query(query, [user_id]);
  return rows[0];
};
