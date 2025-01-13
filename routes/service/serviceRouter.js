const express = require("express");

const { updateCategoryController, getAllCategoryController, createCategoryController } = require("../../controllers/categories/categoryController");


const storage = require('../../utils/fileUpload/storage');
const { createServiceController } = require("../../controllers/service/serviceController");


const serviceRouter = express.Router();

serviceRouter.post("/create", createServiceController); 

module.exports = serviceRouter;


