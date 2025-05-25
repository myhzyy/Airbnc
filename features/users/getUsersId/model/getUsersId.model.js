const format = require("pg-format");
const db = require("../../../../db/connections/dbConnectionPool");

exports.fetchUsersId = async (id) => {
  let query = format(
    `
    SELECT 
    user_id,
    first_name,
    surname,
    email,
    phone_number,
    avatar,
    created_at
    FROM users
    WHERE user_id = %L
    `,
    id
  );

  const { rows } = await db.query(query);
  return rows;
};
