const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        // validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "please provide title and address",
            });
        }


        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newResturant.save();

        res.status(201).send({
            success: true,
            message: "New Resturant Created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Resturant api",
            error,
        });
    }
};

// GET ALL RSTURANT

const getAllResturantsController = async (req, res) => {
    try {
        const resturants = await resturantModel.find();
        if (!resturants)
            return res.status(404).json({
                success: false,
                messege: "No Resturant Available",
            });
        res.status(201).send({
            success: true,
            totalCount: resturants.length,
            resturants
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Get All Resturant API',
            error
        })

    }

}
// GET RESTURNAT BY ID
const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturnat ID",
            });
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId);
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "no resturant found",
            });
        }
        res.status(200).send({
            success: true,
            resturant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get Resturarnt by id api",
            error,
        });
    }
};


// DELETE RESTURANT
const deleteResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(500).send({
                success: false,
                message: "No Resturant Found OR Provide Resturant ID",
            })
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            messege: "Resturant Deleted Successfully",
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error In Delete Resturant API',
            error
        })
    }
}

























module.exports = { createResturantController, getAllResturantsController, getResturantByIdController, deleteResturantController };
