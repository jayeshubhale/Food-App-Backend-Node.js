const categoryModel = require("../models/categoryModel");

// CREATE Category
const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        // validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: 'Please provide category Title or Image'
            })
        }

        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            messege: "Category Created...",
            newCategory
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create category API"
        })
    }
}

// -----------------------------------------------------------------------------------

// GET ALL Category
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                messege: "No Categories found",
            })
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: "Error In  Get All Category API",
            error
        })
    }
}

// -----------------------------------------------------------------------------------

// UPDATE CATE
const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category Found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in update cat api",
            error,
        });
    }
};

// -----------------------------------------------------------------------------------

// DELETE Category

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: 'Please provide Category an ID',
            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: `No Category Found with this ${id}`,
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted SuccessFully",
            data: category._doc,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in Delete Category API",
            error,
        });
    }
};







module.exports = { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController }