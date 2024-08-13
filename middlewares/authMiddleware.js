const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Get token
        const token = req.headers["token"].split(" ")[1];

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized User',
                });
            } else {
                req.body.id = decode.id;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Please Provide Auth Token',
            error,
        });
    }
};
