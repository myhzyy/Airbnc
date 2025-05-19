function formatPropertiesAmenities(propIdRes, propertiesData) {
  const propertiesLookUpMap = {};
  const propIdRows = propIdRes.rows;

  const propertiesLookUp = propIdRows.map((property) => {
    propertiesLookUpMap[property.name] = property.property_id;
  });

  return (formattedAmenities = propertiesData.flatMap((properties) => {
    const { name, amenities } = properties;

    return amenities.map((amenities) => {
      const propertyId = propertiesLookUpMap[name];
      return [propertyId, amenities];
    });
  }));
}

module.exports = formatPropertiesAmenities;
