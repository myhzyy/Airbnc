const { fetchProperties } = require("../models/getProperties.model");

exports.getProperties = async (req, res, next) => {
  try {
    const properties = await fetchProperties(req.query);
    res.status(200).send({ properties });
  } catch (err) {
    console.error("❌ Error in getProperties:", err);
    next(err);
  }
};
