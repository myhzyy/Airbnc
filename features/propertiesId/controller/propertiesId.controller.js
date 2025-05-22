const { fetchPropertyId } = require("../model/propertiesId.model");

exports.getPropertyId = async (req, res, next) => {
  try {
    const propertyId = await fetchPropertyId(req.query);
    res.status(200).send({ propertyId });
  } catch (err) {
    next(err);
  }
};
