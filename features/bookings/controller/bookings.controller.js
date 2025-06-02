const { fetchBookings } = require("../model/bookings.model");

exports.getBookings = async (req, res, next) => {
  const { id } = req.params;

  try {
    const bookings = await fetchBookings(id);
    res.status(200).send({ bookings });
  } catch (err) {
    next(err);
  }
};
