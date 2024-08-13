const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


// REGISTER

const registerController = async (req, res) => {
    console.log(req.body);

    try {

        const { userName, email, password, phone, address, answer, usertype } = req.body;
        //validation

        console.log(req);
        if (!userName || !email || !password || !address || !phone || !answer || !usertype) {

            return res.status(500).send({
                success: false,
                messege: "Please fill out all fields",
            })

        }

        // const myimages = req.files[1] ? req.files[1].filename : null;

        // const image = req.file ? req.file.filename : null;

        //check user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: "Email Already Registered please Login ",
            });
        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
            usertype,
            // profile: image
        });

        res.status(201).send({
            success: true,
            messege: "Successfully Registered",
            // data: newUser

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Register API',
            error
        })
    }
}



// LOGIN

const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Email and Password are required',
            })
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            });
        }

        // check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Creadials"
            });
        }

        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: "7d" });
        // Log the generated token for debugging
        console.log("Generated Token:", token);

        user.password = undefined;
        // If user is found
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Server In Login API',
            error
        })

    }

}



module.exports = { registerController, loginController }