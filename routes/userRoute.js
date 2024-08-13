const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updateUserPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// route
// GET USER || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController)

// RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController)

// PASSWORD PASSWORD
router.post('/updatePassword', authMiddleware, updateUserPasswordController)

// DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteUserController)

module.exports = router;