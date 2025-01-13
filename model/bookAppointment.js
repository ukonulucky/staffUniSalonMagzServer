const mongoose = require("mongoose");

 const bookAppointSchema = new mongoose.Schema({
     fullName: {
         type: String,
         required: true
     },
     email: { type: String, required: true },
     phone: { type: String, required: true },
     date: { type: Date, required: true },
     category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
     },
     services: {
         type: [String],
         required: true
     }
 },
 { timestamps: true }
); 
 
const bookAppointmentModel = mongoose.model('BookAppointment', bookAppointSchema);
module.exports = bookAppointmentModel
   






/*  */
