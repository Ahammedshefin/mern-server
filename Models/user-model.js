const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    } else {
        try {
            const saltround = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(user.password, saltround);
            user.password = hash_password;
            
        } catch (error) {
            next(error);
        }
    }
});

// json web token
userSchema.methods.generateToken = async (data) => {
    try {
        return jwt.sign(
            {
                userid: data._id,
                email: data.email,
                isAdmin: data.isadmin,
            },

            process.env.JWT_KEY,

            {
                expiresIn: "3h",
            }
        );
    } catch (error) {
        console.error(error);
    }
};

userSchema.methods.comparepassword = async (password) => {
    return bcrypt.compare(password, this.password);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
