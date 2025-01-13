const serviceModel = require("../../model/service");

const createServiceController = expressAsyncHandler(
    async (req, res) => {
      
    const { servicePrice, serviceName, categoryId } = req.body;

   
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
                if (service?.categoryId._id === categoryId) { 
                    return service?.categoryId.categoryName
                }
            })
            if (serviceList.length > 0) { 
                throw new Error(`Service ${serviceName} already exist in category ${serviceList[0]}`)
            }
        }
        


        // find if user already exist
        

        const newService = await serviceModel.create({
            servicePrice, serviceName, categoryId
        })
      

    
    return res.status(201).json({
      status: "success",
        message: "Service created successfully",
       service
    });
  }
);

module.exports = { createServiceController };