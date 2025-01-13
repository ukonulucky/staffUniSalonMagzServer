const express = require("express");
const { createBookingController, updateBookingController, getAllBookingController } = require("../../controllers/booking/booking");






const bookingRouter = express.Router();

bookingRouter.post("/create", createBookingController);

bookingRouter.get("/update", updateBookingController);

bookingRouter.get("/bookings", getAllBookingController); 


module.exports = bookingRouter;
