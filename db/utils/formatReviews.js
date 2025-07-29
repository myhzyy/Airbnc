function formatReviews(
  propertiesResRows,
  userResRows,
  reviewsData,
  silent = true
) {
  const propertyIdMap = {};
  const userIdMap = {};

  // Map property name to ID
  propertiesResRows.forEach((property) => {
    propertyIdMap[property.name] = property.property_id;
  });

  // Map full user name to user ID
  userResRows.forEach((user) => {
    const fullName = `${user.first_name} ${user.surname}`;
    userIdMap[fullName] = user.user_id;
  });

  const formattedReviews = [];

  reviewsData.forEach((review) => {
    const property_id = propertyIdMap[review.property_name];
    const guest_id = userIdMap[review.guest_name];

    // Skip and warn if name doesn't match
    if (!property_id || !guest_id) {
      console.warn("⚠️ Skipping review with missing data:", review);
      return;
    }

    formattedReviews.push([
      property_id,
      guest_id,
      review.rating,
      review.comment,
    ]);
  });

  if (!silent) {
    return { formattedReviews, propertyIdMap, userIdMap };
  }

  return formattedReviews;
}

module.exports = formatReviews;
