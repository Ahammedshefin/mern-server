const { Schema, model } = require("mongoose");

const contactschema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
});

const Contact = new model("Contact", contactschema);
module.exports = Contact;
