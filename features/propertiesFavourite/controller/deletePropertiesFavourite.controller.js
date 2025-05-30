const {
  deletePropertyFavourite,
} = require("../model/deletePropertiesFavourite.model");

exports.deleteFavourite = async (req, res, next) => {
  const { id } = req.params;

  if (typeof id === "number") {
    console.log("hi");
  }

  try {
    const deletedFavourite = await deletePropertyFavourite(id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
