const mongoose = require("mongoose");

 const bookAppointSchema = new mongoose.Schema({
     fullName: {
         type: String,
         required: true
     },
     email: { type: String, required: true },
     phone: { type: String, default: null },
     date: { type: String, required: true },
     categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
     },
     services: [String]
 },
 { timestamps: true }
); 
 
const bookAppointmentModel = mongoose.model('BookAppointment', bookAppointSchema);
module.exports = bookAppointmentModel
   






/*  */
