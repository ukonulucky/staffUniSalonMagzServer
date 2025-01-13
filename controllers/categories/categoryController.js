const expressAsyncHandler = require("express-async-handler");

const isValidObjectId = require("../../utils/mongooseIdValidity");

const categoryModel = require("../../model/categories");

// cretate controller
const createCategoryController = expressAsyncHandler(
    async (req, res) => {
        const image = req?.file?.path.toString()
    const { categoryName } = req.body;

   
        if (!categoryName || !image) { 
  throw new Error("Missing credentials")
        }

        // find if user already exist
        

        const category = await categoryModel.findOne({
            categoryName
        })
        if (category) { 
  throw new Error("Category allready exist")
        }
  

        const newCategory = await categoryModel.create({
            categoryName, image
        })

    return res.status(201).json({
      status: "success",
        message: "Categpry created successfully",
      category:newCategory
    });
  }
);


const updateCategoryController = expressAsyncHandler(
    async (req, res) => {
        const { categoryId } = req.params
    const { categoryName } = req.body;

        
        
        
        if (!categoryName) { 
  throw new Error("Missing credentials")
        }

 // check category Id
 if (!isValidObjectId(categoryId.toString())) {
    throw new Error("Invalid category Id");
  }

        // find if user already exist
        const category = await categoryModel.findOneAndUpdate({
            _id: categoryId
        }, {
            categoryName
        }, {
            new: true
        })

    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
    });
  }
);

const getAllCategoryController = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json({
      status: "success",
      categories
    });
  } catch (error) {
    throw new Error(error);
  }
});





module.exports = { createCategoryController, updateCategoryController, getAllCategoryController };
