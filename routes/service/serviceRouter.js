const express = require("express");

const { createServiceController } = require("../../controllers/service/serviceController");


const serviceRouter = express.Router();

serviceRouter.post("/create", createServiceController); 

module.exports = serviceRouter;


