const { propertyTypesData } = require("../data/test");

function formatPropertyTypes(propertyTypesData) {
  return propertyTypesData.map(({ property_type, description }) => {
    return [property_type, description];
  });
}

formatPropertyTypes(propertyTypesData);

module.exports = formatPropertyTypes;
