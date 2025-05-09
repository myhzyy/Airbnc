const { usersData } = require("../data/test");

function formatUserData(usersData) {
  return usersData.map((user) => {
    if (user.role == "host") {
      user.role = true;
    } else {
      user.role = false;
    }

    return [
      user.first_name,
      user.surname,
      user.email,
      user.phone_number,
      user.role,
      user.avatar,
    ];
  });
}

formatUserData(usersData);

module.exports = formatUserData;
