function formatImages(imagesData, propertiesDbDataRows) {
  const propertyIdMap = {};

  propertiesDbDataRows.forEach((property) => {
    const propertyName = property.name;
    propertyIdMap[propertyName] = property.property_id;
  });

  return (formattedImages = imagesData.map((image) => {
    const propertyId = propertyIdMap[image.property_name];
    return [propertyId, image.image_url, image.alt_tag];
  }));
}

module.exports = formatImages;
