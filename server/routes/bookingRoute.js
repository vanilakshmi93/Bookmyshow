const router = require("express").Router();
const stripe = require("stripe")("sk_test_51PjFid15NNu8pyhq0y3xeYoXdFr1aRPeaizba24zUcI48n9OB1FefnNfZiWITEmMkH7KyFQgollJuI7AlT27OH25001UPMYgaC");
const auth = require("../middlewares/authMiddleware");
const Booking = require("../model/bookingModel");
const Show = require("../model/showModel");
const EmailHelper = require("../utils/emailHelper");

// router.post("/make-payment", auth, async (req, res) => {
//   try {
//     const { token, amount } = req.body;
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       customer: customer.id,
//       payment_method_types: ["card"],
//       receipt_email: token.email,
//       description: "Token has been assigned to the movie!",
//     });

//     const transactionid = paymentIntent.id;
//     res.send({
//       success: true,
//       message: "Payment successful",
//       data: transactionid,
//     });
//   } catch (err) {
//     console.log(err);
//     res.send({
//       success: false,
//       message: "Failed to make payment",
//     });
//   }
// });
router.post("/make-payment", async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie!",
    });

     const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message: "Payment Successful! Ticket(s) booked!",
      data: transactionId,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/book-show", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    // adding more details for the booked ticket
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    console.log("this is populated booking", populatedBooking);

    await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.movieName,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionid: populatedBooking.transactionId,
    });

    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Failed to book show",
    });
  }

});
router.get("/get-all-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched!",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;