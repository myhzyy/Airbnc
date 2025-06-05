const { fetchAmenities } = require("../model/amenities.model");

exports.getAmenities = async (req, res, next) => {
  try {
    const amenities = await fetchAmenities();
    res.status(200).send({ amenities });
  } catch (err) {
    next(err);
  }
};
