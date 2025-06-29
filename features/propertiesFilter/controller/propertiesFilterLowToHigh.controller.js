const {
  getProperties,
} = require("../../properties/controllers/getProperties.controller");

const {
  fetchPropertiesSortedByPrice,
} = require("../model/propertiesFilterLowToHigh.model");

exports.getPropertiesSortedByPriceLowToHigh = async (req, res, next) => {
  try {
    const properties = await fetchPropertiesSortedByPrice();
    res.status(200).send({ properties });
  } catch (err) {
    next(err);
  }
};
