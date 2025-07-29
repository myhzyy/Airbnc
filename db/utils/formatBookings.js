function formatBookings(
  propertiesTableResRows,
  usersTableResRows,
  bookingsData
) {
  const propertiesLookUpMap = {};
  const usersLookUpMap = {};

  propertiesTableResRows.forEach((property) => {
    propertiesLookUpMap[property.name] = property.property_id;
  });

  usersTableResRows.forEach((user) => {
    const userName = `${user.first_name} ${user.surname}`;
    usersLookUpMap[userName] = user.user_id;
  });

  const formattedBookings = [];

  bookingsData.forEach(
    ({ property_name, guest_name, check_in_date, check_out_date }) => {
      const propertyId = propertiesLookUpMap[property_name];
      const guestId = usersLookUpMap[guest_name];

      if (propertyId && guestId) {
        formattedBookings.push([
          propertyId,
          guestId,
          check_in_date,
          check_out_date,
        ]);
      } else {
        console.warn("⚠️ Skipping booking with missing data:", {
          property_name,
          guest_name,
          check_in_date,
          check_out_date,
        });
      }
    }
  );

  return formattedBookings;
}

module.exports = formatBookings;
