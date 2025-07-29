function formatFavourites(
  favouritesData,
  userIdDbDataRows,
  propertiesDbDataRows
) {
  const userIDMap = {};
  const propertyIdMap = {};

  userIdDbDataRows.forEach((user) => {
    const fullName = `${user.first_name} ${user.surname}`;
    userIDMap[fullName] = user.user_id;
  });

  propertiesDbDataRows.forEach((property) => {
    const propertyName = property.name;
    propertyIdMap[propertyName] = property.property_id;
  });

  const formattedFavourites = [];

  favouritesData.forEach((favourite) => {
    const guest_id = userIDMap[favourite.guest_name];
    const property_id = propertyIdMap[favourite.property_name];

    if (guest_id && property_id) {
      formattedFavourites.push([guest_id, property_id]);
    } else {
      console.warn("⚠️ Skipping favourite with missing data:", favourite);
    }
  });

  return formattedFavourites;
}

module.exports = formatFavourites;
