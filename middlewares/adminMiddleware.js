const userModel = require("../models/userModel");


module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user.usertype !== "admin") {
            return res.status(404).send({
                success: false,
                message: "Only Admin Access",
            })
        } else {
            next();
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Un-Authorized Access',
            error,
        });
    }
};
