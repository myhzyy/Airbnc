const { insertPropertyReview } = require("../models/postProperties.model");

exports.postReviews = async (req, res, next) => {
  const { id } = req.params;
  const { guest_id, rating, comment } = req.body;

  if (!guest_id || !rating || !comment) {
    return res.status(400).send({ msg: "Missing required review fields!" });
  }

  try {
    const review = await insertPropertyReview(id, {
      guest_id,
      rating,
      comment,
    });

    res.status(201).send(review);
  } catch (err) {
    next(err);
  }
};
