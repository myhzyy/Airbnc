const { fetchUsersId } = require("../model/getUsersId.model");

exports.getUsersId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [userId] = await fetchUsersId(id);
    res.status(200).send({ user: [userId] });
  } catch (err) {}
};
