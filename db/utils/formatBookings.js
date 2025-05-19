function formatBookings(
  propertiesTableResrows,
  usersTableResrows,
  bookingsData
) {
  const propertiesLookUpMap = {};
  const usersLookUpMap = {};

  const propertiesLookUpList = propertiesTableResrows.map((properties) => {
    const propertyName = properties.name;
    const propertyId = properties.property_id;
    propertiesLookUpMap[propertyName] = propertyId;
  });

  const usersLookUpList = usersTableResrows.map((users) => {
    const userName = `${users.first_name} ${users.surname}`;
    const userId = users.user_id;
    usersLookUpMap[userName] = userId;
  });

  return (formattedBookings = bookingsData.map(
    ({ property_name, guest_name, check_in_date, check_out_date }) => {
      return [
        propertiesLookUpMap[property_name],
        usersLookUpMap[guest_name],
        check_in_date,
        check_out_date,
      ];
    }
  ));
}

module.exports = formatBookings;
