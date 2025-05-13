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

  return (formattedFavourites = favouritesData.map((favourites) => {
    const guest_id = userIDMap[favourites.guest_name];
    const property_id = propertyIdMap[favourites.property_name];

    return [guest_id, property_id];
  }));
}

module.exports = formatFavourites;
