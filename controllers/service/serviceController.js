const expressAsyncHandler = require("express-async-handler");
const serviceModel = require("../../model/service");
const isValidObjectId = require("../../utils/mongooseIdValidity");

const createServiceController = expressAsyncHandler(
    async (req, res) => {
      
    const { servicePrice, serviceName, categoryId } = req.body;
console.log(req.body)
   
        if (!servicePrice || !serviceName || !categoryId) { 
  throw new Error("Missing credentials")
        }

// check category Id
if (!isValidObjectId(categoryId.toString())) {
    throw new Error("Invalid category Id");
  }

        
        /* seearch if service already exist within a category */

        const allService = await serviceModel.find({
            serviceName
        }).populate("categoryId").exec();


        if (allService.length > 0) { 
            /* FIND category */
           
            const serviceList = allService.filter(service => { 
                if (service?.categoryId._id == categoryId) { 
                    return service?.categoryId?.categoryName
                }
            })
          
            if (serviceList.length > 0) { 
                throw new Error(`Service ${serviceName} already exist in category ${serviceList[0]?.categoryId?.categoryName}`)
            }
        }
        


        // find if user already exist
        

        const newService = await serviceModel.create({
            servicePrice, serviceName, categoryId
        })
      

    
    return res.status(201).json({
      status: "success",
        message: "Service created successfully",
       newService
    });
  }
);


const allServiceController = expressAsyncHandler(
    async (req, res) => {
    
        const services = await serviceModel.find()

    return res.status(200).json({
      status: "success",
        message: "services fetched successfully",
      services
    });
  }
);

module.exports = { createServiceController, allServiceController };