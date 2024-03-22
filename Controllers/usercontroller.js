const Contact = require("../Models/Contact-model");
const User = require("../Models/user-model");

const bcrypt = require("bcryptjs");

const homecontroller = async (req, res) => {
    try {
        res.status(200).send("Admin root dierectory");
    } catch (error) {
        console.log(error);
    }
};
const registercontroller = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ mssg: "email already exist" });
        }
        const usercreated = await User.create({
            username,
            email,
            phone,
            password,
        });
        res.json({
            mssg: "jwt successfull",
            token: await usercreated.generateToken(usercreated),
            userid: usercreated._id.toString(),
        });
    } catch (error) {
        console.log(error);
    }
};

const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(401).json("internet server error");
        }

        const user = await bcrypt.compare(password, userExist.password);

        if (user) {
            res.json({
                mssg: "jwt successfull",
                token: await userExist.generateToken(userExist),
                userid: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ mssg: "invalid email or password" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getuserdata = async (req, res) => {
    try {
        const userdata = req.user;
        res.status(200).json({ userdata });
    } catch (error) {
        console.log(error);
    }
};
const contactcontroller = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        await Contact.create({
            username: data.username,
            email: data.email,
            message: data.message,
        });
        res.json('message sent successfullly');
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    homecontroller,
    registercontroller,
    logincontroller,
    getuserdata,
    contactcontroller,
};
