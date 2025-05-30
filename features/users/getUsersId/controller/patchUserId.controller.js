const { fetchPatchUserId } = require("../model/patchUserId.model");

exports.patchUserId = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  if (isNaN(Number(id))) {
    return next({ status: 400, msg: "Invalid user_id" });
  }

  try {
    const updatedUser = await fetchPatchUserId(id, updateData);
    res.status(200).send({ updatedUser });
  } catch (err) {
    next(err);
  }
};
