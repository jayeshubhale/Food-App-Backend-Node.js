
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOODS
const createFoodController = async (req, res) => {
    try {
        const { title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating, ratingCount } = req.body;
        if (!title || !description || !price || !resturant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            })
        }
        const newFood = new foodModel({ title, description, price, imageUrl, foodTags, category, code, isAvailable, resturant, rating, ratingCount });

        await newFood.save();
        res.status(200).send({
            success: true,
            messege: "New Food Item Created",
            newFood
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create food API"
        })
    }
}

// --------------------------------------------------------------------------------------------
// Get All Food
const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return ress.status(404).send({
                success: false,
                message: "No Food items was Found",
            })
        }
        res.status(200).send({
            success: true,
            TotleFoods: foods.length,
            foods,
        })
    }
    catch (error) {
        console.log(error);
        ress.status(500).send({
            succes: false,
            messege: "Error In Get All Foods API",
            error
        })
    }

}


// --------------------------------------------------------------------------------------------
// Get Single Food
const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please Provide id",
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No FOOD Found with this id"
            });
        }

        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Single Food API"
        });
    }
};

// --------------------------------------------------------------------------------------------

// GET Food By Resturant
const getFoodByResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(400).send({
                success: false,
                message: "Please Provide id",
            });
        }

        const food = await foodModel.find({ resturant: resturantId });
        console.log("Food-Data", food);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No FOOD Found with this id"
            });
        }

        res.status(200).send({
            success: true,
            messege: "Food Based on Resturant",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Food By Resturant API"
        });
    }
};

// --------------------------------------------------------------------------------------------
// Update Food

const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.staus(500).send({
                success: false,
                messege: "Please Provide food Id",
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success: false,
                messahe: "No Food Found",
            })
        }

        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        }, {
            new: true
        })

        res.status(200).send({
            success: true,
            message: 'Food item was Updated Successfully',
            updatedFood
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            messege: "Error in Update Food API",
        })
    }

}


// --------------------------------------------------------------------------------------------
// Delete Food

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Provide food id",
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No Food Found with this id",
            });
        }

        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Food API",
        });
    }
};


// =======================================================================================================
// Place Order

const placeOrderController = async (req, res) => {
    try {
        const { cart, payment } = req.body;
        if (!cart) {
            return res.status(404).send({
                success: false,
                messege: "Please Provide food cart"
            })
        }

        let total = 0;
        // Calculate
        cart.map((i) => {
            total = total + i.price;
        })

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        })
        await newOrder.save();

        res.status(201).send({
            success: true,
            messege: "Order Placed Succeessfully",
            newOrder,
        })

    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            messege: "Error In Place-Order API",
            error
        })
    }
}

// =======================================================================================================
const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a valid order id'
            });
        }

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Order Status Updated'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Order Status API'
        });
    }
};





module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController }