const mongoose = require("mongoose");

 const categoriesSchema = new mongoose.Schema({
     categoryName: {
         type: String,
         required: true
     },
    image: { type: String, required: true },
 },
 { timestamps: true }
); 
 
const categoryModel = mongoose.model('Category', categoriesSchema);
module.exports = categoryModel
   




