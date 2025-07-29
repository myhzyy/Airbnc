function formatProperties(propertiesData, usersData) {
  const userIdMap = {};

  usersData.forEach((user) => {
    const fullName = `${user.first_name} ${user.surname}`;
    userIdMap[fullName] = user.user_id;
  });

  const formattedProperties = propertiesData.map((property) => {
    const hostId = userIdMap[property.host_name];

    const result = [
      hostId,
      property.name,
      property.location,
      property.property_type,
      property.price_per_night,
      property.description,
      property.latitude,
      property.longitude,
    ];

    return result;
  });

  return formattedProperties;
}

module.exports = formatProperties;
