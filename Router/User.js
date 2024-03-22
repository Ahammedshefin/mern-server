const express = require("express");
const usercontroller = require("../Controllers/usercontroller");
const router = express.Router();
const authmiddleware = require("../middleware/Auth");

router.get("/",  usercontroller.homecontroller);

router.route("/register").post( usercontroller.registercontroller);
router.route("/login").post( usercontroller.logincontroller);

router
    .route("/userdata")
    .get(authmiddleware.authmiddleware,  usercontroller.getuserdata);

router.route("/contact").post( usercontroller.contactcontroller);
module.exports = router;
