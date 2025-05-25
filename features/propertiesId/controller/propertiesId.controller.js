const { fetchPropertyId } = require("../model/propertiesId.model");

exports.getPropertyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.query;

    const propertyId = await fetchPropertyId(id, user_id);
    res.status(200).send({ propertyId });
  } catch (err) {
    next(err);
  }
};
