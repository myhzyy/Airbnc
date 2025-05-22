const db = require("../../../db/connections/dbConnectionPool");

exports.fetchReviewsByPropertyId = async (property_id) => {
  const reviewsQuery = `
    SELECT 
      reviews.review_id,
      reviews.comment,
      reviews.rating,
      reviews.created_at,
      CONCAT(users.first_name, ' ', users.surname) AS guest,
      users.avatar AS guest_avatar
    FROM reviews
    JOIN users ON reviews.guest_id = users.user_id
    WHERE reviews.property_id = $1
    ORDER BY reviews.created_at DESC;
  `;

  const { rows } = await db.query(reviewsQuery, [property_id]);

  const avgQuery = `
      SELECT ROUND(AVG(rating)::numeric, 2) AS average_rating
      FROM reviews
      WHERE property_id = $1
    `;

  const {
    rows: [{ average_rating }],
  } = await db.query(avgQuery, [property_id]);

  return { rows, average_rating };
};
