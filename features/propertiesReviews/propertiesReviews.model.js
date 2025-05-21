const db = require("../../db/connections/dbConnectionPool");

exports.fetchReviews = async (req, res, next) => {
  const query = `SELECT 
  reviews.review_id,
  reviews.comment,
  reviews.rating,
  reviews.created_at,
  CONCAT(users.first_name, ' ', users.surname) AS guest,
  users.avatar AS guest_avatar
  FROM reviews
  JOIN users ON reviews.guest_id = users.user_id
  ORDER BY reviews.created_at DESC;
`;

  const { rows } = await db.query(query);
  return rows;
};
