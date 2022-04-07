const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const userController = require('../controllers/userController')
const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteuser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, userController.getAllUser);

//GET USER STATS
 router.get("/stats", verifyTokenAndAdmin,userController.getUserStart )
module.exports = router;
