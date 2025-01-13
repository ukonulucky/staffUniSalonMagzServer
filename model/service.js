const mongoose = require("mongoose");

 const serviceSchema = new mongoose.Schema({
     servicePrice: {
         type: String,
         required: true
     },
     serviceName: { type: String, required: true },
     categoryId: {
        type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
     }
 },
 { timestamps: true }
); 
 
const serviceModel = mongoose.model('Service', serviceSchema);
module.exports = serviceModel
   






/*  */
