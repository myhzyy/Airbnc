const bcrypt = require("bcrypt");

async function formatAuthUsers(authUsersData) {
  const hashedUsers = await Promise.all(
    authUsersData.map(async (user) => {
      const hashed_password = await bcrypt.hash(user.password, 10);
      return {
        email: user.email,
        hashed_password,
      };
    })
  );
  return hashedUsers;
}

module.exports = formatAuthUsers;
