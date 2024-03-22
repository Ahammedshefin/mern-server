const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");

const authmiddleware = async (req, res, next) => {
    let token = req.header("token");

    if (!token) {
        res.json({ mssg: "erro" });
    }

    try {
        const isverified = await jwt.verify(token, process.env.JWT_KEY);
        const userdetails = await User.findOne({
            email: isverified.email,
        }).select({ password: 0 });

        req.user = userdetails;
        req.token = token;
        req.userid = userdetails._id;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { authmiddleware };
