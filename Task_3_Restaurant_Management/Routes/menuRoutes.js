const express = require("express");
const router = express.Router();
const { addMenuItem, getAllMenuItems,updateMenuAvailability } = require("../Controllers/menucontroller");

// Route to add a menu item (Admin use)
router.post("/menu", addMenuItem);
// Route to get all menu items (Customer view)
router.get("/menu", getAllMenuItems);
// Route to update menu item availability (Admin use)
router.put("/menu/:id/availability", updateMenuAvailability);
module.exports = router;
