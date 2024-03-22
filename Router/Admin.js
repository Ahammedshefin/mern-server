const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/Auth");

const admincontroller = require("../Controllers/Admincontrollers");

router
    .route("/users")
    .get(authmiddleware.authmiddleware, admincontroller.getallusers);

router
    .route("/users/:id")
    .get(authmiddleware.authmiddleware, admincontroller.getusersbyid);
router
    .route("/users/update/:id")
    .patch(authmiddleware.authmiddleware, admincontroller.updateuser);

router
    .route("/contacts")
    .get(authmiddleware.authmiddleware, admincontroller.getallcontacts);
router
    .route("/user/delete/:id")
    .delete(authmiddleware.authmiddleware, admincontroller.deleteuser);

router
    .route("/contact/delete/:id")
    .delete(authmiddleware.authmiddleware, admincontroller.deletecontact);

module.exports = router;
