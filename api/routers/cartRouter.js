
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();
const cartController = require('../controllers/cartController')

//CREATE

router.post("/", verifyToken,cartController.cartCreate);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, cartController.cartUpdate);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, cartController.cartDelete);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getUserCart);

// //GET ALL

router.get("/", verifyTokenAndAdmin,cartController.getAll);

module.exports = router;
