const express = require("express");

const { updateCategoryController, getAllCategoryController, createCategoryController } = require("../../controllers/categories/categoryController");
const multer = require("multer");

const storage = require('../../utils/fileUpload/storage');


const upload = multer({storage: storage})

const categoryRouter = express.Router();

categoryRouter.get("/update/:categoryId", updateCategoryController); 
categoryRouter.get("/categories",getAllCategoryController); 

 /* create category controller */

categoryRouter.post("/create",upload.single("file"),createCategoryController); 


module.exports = categoryRouter;


