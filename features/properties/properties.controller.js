const { fetchProperties, getPropertiesById } = require("./properties.model");

exports.getProperties = async (req, res, next) => {
  const properties = await fetchProperties();
  res.status(200).send({ properties });
};

exports.getPropertiesById = async (req, res, next) => {
  const { id } = req.params;

  const properties = await getPropertiesById(id);

  res.status(200).send({ properties });
};

/// sends the res to postman
