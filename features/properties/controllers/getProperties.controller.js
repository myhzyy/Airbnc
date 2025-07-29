const {
  fetchProperties,
  fetchPropertyQueries,
} = require("../models/getProperties.model");

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await fetchProperties(req.query);
    res.status(200).send({ properties });
  } catch (err) {
    next(err);
  }
};
