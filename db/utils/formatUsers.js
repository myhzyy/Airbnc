const { usersData } = require("../data/test");

function formatUserData(usersData) {
  return usersData.map((user) => {
    const isHost = user.role === "host";

    return [
      user.first_name,
      user.surname,
      user.email,
      user.phone_number,
      isHost,
      user.avatar,
    ];
  });
}

formatUserData(usersData);

module.exports = formatUserData;
