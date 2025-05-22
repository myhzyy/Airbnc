const {
  fetchReviewsByPropertyId,
} = require("../models/propertiesReviews.model");

exports.getReviewsByPropertyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows, average_rating } = await fetchReviewsByPropertyId(id);
    res.status(200).send({ reviews: rows, average_rating });
  } catch (err) {}
};
