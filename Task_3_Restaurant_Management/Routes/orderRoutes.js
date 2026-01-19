const express = require("express");
const router = express.Router();
const { createOrder,getOrderDetails,completeOrder } = require("../Controllers/ordercontroller");

router.post("/orders", createOrder);
router.get("/orders/:id", getOrderDetails);
router.put("/orders/:id/complete", completeOrder);

module.exports = router;