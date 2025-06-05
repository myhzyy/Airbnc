const e = require("express");
const { deletePropertyReview } = require("../models/deleteReviews.model");

exports.deleteReview = async (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    const err = new Error("Invalid review_id");
    err.status = 400;
    return next(err);
  }

  try {
    await deletePropertyReview(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
