const user = require("../Models/user-model");
const Contacts = require("../Models/Contact-model");
const User = require("../Models/user-model");
const Contact = require("../Models/Contact-model");

const getallusers = async (req, res, next) => {
    try {
        const users = await user.find().select({
            password: 0,
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ mssg: "user not found" });
        }

        return res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};
const getallcontacts = async (req, res) => {
    try {
        const contactdetails = await Contacts.find();
        if (!contactdetails || contactdetails.length === 0) {
            return res.json({ mssg: "no contact found" });
        }

        return res.json({ contactdetails });
    } catch (error) {
        console.log(error);
    }
};
const deleteuser = async (req, res) => {
    try {
        const userid = req.params.id;
        await User.deleteOne({ _id: userid });

        return res.json({ mssg: "deleted userrsuceessfully" });
    } catch (error) {
        console.log(error);
    }
};
const getusersbyid = async (req, res) => {
    try {
        const userid = req.params.id;

        const userdata = await User.findOne({ _id: userid }).select({
            password: 0,
        });

        return res.json({ userdata });
    } catch (error) {
        console.log(error);
    }
};

const updateuser = async (req, res) => {
    console.log(req.body);

    try {
        const userid = req.params.id;
        const data = req.body;

        const response = await User.updateOne(
            { _id: userid },
            {
                $set: data,
            }
        );
        console.log(response);

        return res.json({ response });
    } catch (error) {
        console.log(error);
    }
};
const deletecontact = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Contact.deleteOne({ _id: id });

        return res.json({ response });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getallusers,
    getallcontacts,
    deleteuser,
    getusersbyid,
    updateuser,
    deletecontact,
};
