const {
  selectAmenitiesByPropertyId,
} = require("../model/propertiesAmenities.model");

exports.getAmenitiesByPropertyId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const amenities = await selectAmenitiesByPropertyId(id);
    res.status(200).send({ amenities });
  } catch (err) {
    next(err);
  }
};
