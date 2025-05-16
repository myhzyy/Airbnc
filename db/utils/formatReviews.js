function formatReviews(
  propertiesResRows,
  userResRows,
  reviewsData,
  logger = console.log,
  silent = true
) {
  const propertyIdMap = {};
  const userIdMap = {};

  propertiesResRows.forEach((property) => {
    propertyIdMap[property.name] = property.property_id;
  });

  userResRows.forEach((user) => {
    const fullName = `${user.first_name} ${user.surname}`;
    userIdMap[fullName] = user.user_id;
  });

  const formattedReviews = reviewsData.map((review) => {
    const property_id = propertyIdMap[review.property_name];
    const guest_id = userIdMap[review.guest_name];

    return [property_id, guest_id, review.rating, review.comment];
  });

  if (!silent) {
    logger(propertyIdMap);
    logger(userIdMap);
  }

  return formattedReviews;
}

module.exports = formatReviews;
