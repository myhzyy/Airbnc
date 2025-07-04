const { getBookingsByUserId } = require("../model/getBookingsByUserId.model");

exports.getBookingsByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const bookings = await getBookingsByUserId(user_id);
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
