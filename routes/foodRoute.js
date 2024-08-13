const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodsController');
const adminMiddleware = require('../middlewares/adminMiddleware');




const router = express.Router();

// route
// CREATE FOOODS
router.post('/createFood', authMiddleware, createFoodController);

// Get All Food
router.get('/getAllFood', getAllFoodController);

// Get Single Food
router.get('/get/:id', getSingleFoodController);

// Get Food BY Resturant
router.get('/getByResturant/:id', getFoodByResturantController);

// Update Food
router.put('/updateFood/:id', authMiddleware, updateFoodController);


// Delete Food
router.delete('/deleteFood/:id', authMiddleware, deleteFoodController);

// Place Order
router.post("/placeOrder", authMiddleware, placeOrderController);


// Order Status
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController)

module.exports = router;