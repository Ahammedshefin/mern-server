require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userrouter = require("./Router/User");
const adminrouter = require("./Router/Admin");
const connectdb = require("./Utility/db");
const authmiddleware=require('./middleware/Auth')

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH ,HEAD",
    Credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());

app.use("/", userrouter);
app.use("/admin",adminrouter );
const PORT = process.env.PORT;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is live on port ${PORT}`);
    });
});
