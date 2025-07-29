function formatImages(imagesData, propertiesDbDataRows) {
  const propertyIdMap = {};

  propertiesDbDataRows.forEach((property) => {
    const propertyName = property.name;
    propertyIdMap[propertyName] = property.property_id;
  });

  const formattedImages = [];

  imagesData.forEach((image) => {
    const propertyId = propertyIdMap[image.property_name];

    if (propertyId) {
      formattedImages.push([propertyId, image.image_url, image.alt_tag]);
    } else {
      console.warn("⚠️ Skipping image with missing property_id:", image);
    }
  });

  return formattedImages;
}

module.exports = formatImages;
