const {
  getProperties,
} = require("../../properties/controllers/getProperties.controller");

const {
  fetchPropertiesSortedByPrice,
} = require("../model/propertiesFilter.model");

exports.getPropertiesSortedByPrice = async (req, res, next) => {
  try {
    const properties = await fetchPropertiesSortedByPrice();
    res.status(200).send({ properties });
  } catch (err) {
    next(err);
  }
};
