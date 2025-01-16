const expressAsyncHandler = require("express-async-handler");

const isValidObjectId = require("../../utils/mongooseIdValidity");
const bookAppointmentModel = require("../../model/bookAppointment");



// cretate controller
const createBookingController = expressAsyncHandler(
    async (req, res) => {
       
    const { fullName, email, phone, date, categoryId, services} = req.body;
 
console.log("body", req.body, JSON.parse(services))
        
        if (!fullName || !email  || !date || !categoryId  || JSON.parse(services).length == 0) { 
  throw new Error("Missing credentials")
        }

         // check category Id
         if (!isValidObjectId(categoryId.toString())) {
            throw new Error("Invalid category Id");
          }

        // find if user already exist
        

        const booking = await bookAppointmentModel.create({
            fullName,
            email,
            phone,
            date,
            categoryId,
            services

        })

    const { 
      _id
    } = booking
   
        const option = {
          subject: "Booking Notification",
          emailTemplate:
            `Hello ${fullName} your booking was successfull  and your booking Id  is ${_id}. Looking forawrd to serve you...Cheers.`,
          to: [
            {
              email,
              name: fullName,
            },
          ],
        };
      
        sendBrevoEmail(option); 
    return res.status(201).json({
      status: "success",
        message: "Booking created successfully",
     booking
    });
  }
);

const updateBookingController = expressAsyncHandler(
    async (req, res) => {
     
    const { fullName, email, phone, date, categoryId, services, bookingId} = req.body;
 

        
    if (!fullName || !email || !phone || !date || !categoryId  || services.length == 0 || !bookingId) { 
throw new Error("Missing credentials")
    }

     // check category Id
     if (!isValidObjectId(categoryId.toString())) {
        throw new Error("Invalid category Id");
      }

        
          // check category Id
     if (!isValidObjectId(bookingId.toString())) {
        throw new Error("Invalid booking Id");
      }

    // find if user already exist
    

        // find if user already exist
        const booking = await bookAppointmentModel.findOneAndUpdate({
            _id: bookingId
        }, {
            fullName,
            email,
            phone,
            date,
            categoryId,
            services
        }, {
            new: true
        })

    return res.status(200).json({
      status: "success",
        message: "Booking updated successfully",
        booking
      
    });
  }
);

const getAllBookingController = expressAsyncHandler(async (req, res) => {
  try {
    const bookings = await bookAppointmentModel.find();
    return res.status(200).json({
      status: "success",
      bookings
    });
  } catch (error) {
    throw new Error(error);
  }
});





module.exports = { createBookingController, updateBookingController, getAllBookingController };
