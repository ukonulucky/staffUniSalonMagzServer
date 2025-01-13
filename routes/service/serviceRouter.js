const express = require("express");

const { createServiceController, allServiceController, deleteSingleServiceController } = require("../../controllers/service/serviceController");


const serviceRouter = express.Router();

serviceRouter.post("/create", createServiceController); 
serviceRouter.get("/services", allServiceController); 
serviceRouter.delete("/delete/:serviceId", deleteSingleServiceController); 


module.exports = serviceRouter;


