const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const orderController = require('../controllers/orderController')
const router = require("express").Router();

//CREATE

router.post("/", verifyToken,orderController.createOrder );

//UPDATE
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);

//DELETEor
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getUserOrder);

// //GET ALL

router.get("/", verifyTokenAndAdmin,orderController.getAll);

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
