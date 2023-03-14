const express = require("express");
const moment = require("moment");

const router = express.Router();

const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    room.currentbookings = temp;
    await room.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });

    res.send(bookings);
  } catch (error) {
    console.log(error);
    // return res.status(400).json({ message: error });
  }
});


router.post("/bookroom", async (req, res) => {
  try {
    const { room, userid, fromdate, todate, totalAmount, totaldays, token } =
      req.body;

    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const payment = await stripe.charges.create(
        {
          amount: totalAmount * 100,
          customer: customer.id,
          currency: "INR",
          receipt_email: token.email,
        },
        {
          idempotencyKey: Math.floor(Math.random() * (99999999 - 10000) + 10000),
        }
      );
        console.log("payment",payment);
      if (payment) {
        try {
          const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount: totalAmount,
            totaldays,
            transactionid: Math.floor(Math.random() * (99999999 - 10000) + 10000),
          });

          console.log("newbooking", newBooking);
          
          const booking = await newBooking.save();

          const roomTmp = await Room.findOne({ _id: room._id });
          roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await roomTmp.save();
          res.send("Payment Successful, Your Room is booked");
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


module.exports = router;
