const { insertBooking } = require("../model/postBookings.model");

exports.postBooking = async (req, res, next) => {
  //   console.log(req);

  const { guest_id, check_in_date, check_out_date } = req.body;
  const { id: property_id } = req.params;

  try {
    const newBooking = await insertBooking(
      property_id,
      guest_id,
      check_in_date,
      check_out_date
    );
    res.status(201).send({ booking: newBooking });
  } catch (err) {
    next(err);
  }
};
