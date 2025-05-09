const { propertiesData } = require("../data/test");

function formatProperties(propertiesData) {
  return propertiesData.map(
    ({ name, location, property_type, price_per_night, description }) => [
      name,
      location,
      property_type,
      price_per_night,
      description,
    ]
  );
}

console.log(formatProperties(propertiesData));
