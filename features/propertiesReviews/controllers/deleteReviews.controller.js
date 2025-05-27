const e = require("express");
const { deletePropertyReview } = require("../models/deleteReviews.model");

exports.deleteReview = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedReview = await deletePropertyReview(id);
    res.status(200).send({ deleted: deletedReview });
  } catch (err) {
    next(err);
  }
};
