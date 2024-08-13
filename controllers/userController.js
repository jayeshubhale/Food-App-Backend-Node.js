// GET USER INFO
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');



const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id });
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }
        // hide password
        user.password = undefined;
        // send response
        res.status(200).send({
            success: true,
            message: "User Get Successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in Get User API',
            error
        });
    }
};

// -----------------------------------------------------------------------------------------------------


// UPDATE PROFILE
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findOne({ _id: req.body.id })
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                messege: "User not found",
            })
        }
        // update 
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone
        // save user
        await user.save();
        // send response
        res.status(200).send({
            success: true,
            messege: "User Update Successfully",
            data: user
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error In Update User API',
            error
        });
    }

}

// -----------------------------------------------------------------------------------------------------

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                messege: "All fields are required",
                error
            })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User Not Found or invalid Answer",
            })

        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({
            success: true,
            message: `The Password is Reset Successfully`,
            // data: user._id,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            messege: "error in PASSWORD RESET API",
            error

        })
    }
}

// -----------------------------------------------------------------------------------------------------
// UPDATE USER PASSWORD
const updateUserPasswordController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id })
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                messege: "User Not Found"

            })
        }
        // get data from user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                messege: 'Please Provide Old or New Password'
            })
        }
        // check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid InValid Old Password"
            });
        }
        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            messege: "Password Updated",
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            messege: "Error In Password Update API",
            error
        })
    }
}


// -----------------------------------------------------------------------------------------------------
// DELETE PROFILE ACCOUNT

const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            messege: "Your  Account has been deleted"
        })
    } catch (error) {
        console.log("Delete User Error : ", error);
        res.status(500).send({
            success: false,
            message: "Error In Delete Profile API",
            error
        })
    }

}


module.exports = { getUserController, updateUserController, resetPasswordController, updateUserPasswordController, deleteUserController };
