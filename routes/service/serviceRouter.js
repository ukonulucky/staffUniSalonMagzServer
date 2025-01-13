const express = require("express");

const { createServiceController, allServiceController } = require("../../controllers/service/serviceController");


const serviceRouter = express.Router();

serviceRouter.post("/create", createServiceController); 
serviceRouter.get("/services", allServiceController); 


module.exports = serviceRouter;


