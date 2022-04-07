const router = require('express').Router();
const productControllers = require('../controllers/productController');
const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');
// create product
router.post("/", verifyTokenAndAdmin,productControllers.createProduct);

// count product
router.get("/count",productControllers.countProducts);

// get  product 
router.get("/:id",productControllers.getOneProduct);  

// get all product 
 router.get("/",productControllers.getProducts);   

// update product 
router.put("/:id",productControllers.updateProducts);   

 

// delete product 
router.delete("/:id",productControllers.deleteProducts);   

// find product 
router.get("/find/:find",productControllers.findProducts); 

module.exports = router;