const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantsController, getResturantByIdController, deleteResturantController } = require('../controllers/resturantController');

const router = express.Router();

// routes

// CREATE RESTURANT || POST
router.post('/createRestaurants', authMiddleware, createResturantController);

// GET ALL RESTURENTS || GET
router.get('/getAllResturants', getAllResturantsController);

// GET RESTURANT BY ID || GET
router.get('/getResturantId/:id', getResturantByIdController)

// DELETE RESTURANT || DELETE
router.delete('/delete/:id', authMiddleware, deleteResturantController);


module.exports = router;
