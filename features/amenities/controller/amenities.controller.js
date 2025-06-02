const { fetchAmenities } = require("../model/amenities.model");

exports.getAmenities = async (req, res, next) => {
  try {
    const amenities = await fetchAmenities();
  } catch (err) {
    next(err);
  }
};
