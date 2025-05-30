const { insertFavourite } = require("../model/postPropertiesFavourite.model");

exports.postFavourite = async (req, res, next) => {
  const { id: property_id } = req.params;

  if (!req.body || typeof req.body !== "object") {
    return next({ status: 400, message: "Missing body" });
  }
  const { guest_id } = req.body;

  if (!guest_id) {
    return next({ status: 400, message: "Missing guest_id" });
  }

  if (isNaN(property_id)) {
    return next({
      status: 400,
      message: "SENT body was NOT a valid. Try using a number.",
    });
  }

  try {
    const favourite = await insertFavourite(property_id, guest_id);
    res.status(201).send({
      msg: "Property favourited successfully.",
      favourited_id: favourite[0].favourite_id,
    });
  } catch (err) {
    next(err);
  }
};
