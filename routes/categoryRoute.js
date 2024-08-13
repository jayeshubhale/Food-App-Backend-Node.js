const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

// routes

// CREATE Category || POST
router.post('/createCategory', authMiddleware, createCategoryController);

// Get All Cat || POST
router.get('/getAllCategory', getAllCategoriesController);

// UPDATE Cat  || PUT
router.put('/updateCategory/:id', authMiddleware, updateCategoryController);

// DLEETE CAT
router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);




module.exports = router;
