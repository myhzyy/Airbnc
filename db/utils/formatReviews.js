function formatReviews(
  propertiesResRows,
  userResRows,
  reviewsData,
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
    return { formattedReviews, propertyIdMap, userIdMap };
  }

  return formattedReviews;
}

module.exports = formatReviews;
