const {
  deletePropertyFavourite,
} = require("../model/deletePropertiesFavourite.model");

exports.deleteFavourite = async (req, res, next) => {
  const { id, user_id } = req.params;

  try {
    await deletePropertyFavourite(id, user_id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
