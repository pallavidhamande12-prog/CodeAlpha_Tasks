const Order = require("../Models/Order");
const OrderItem = require("../Models/OrderItem");
const Menu = require("../Models/Menu");
const Inventory = require("../Models/Inventory");

// Creating a new order
const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // items: [{menuId, quantity}, ...]
    let totalAmount = 0;

    //create empty order
    const order = await Order.create({
        totalAmount: 0,
    });

    for (let item of items) {
        const menuItem = await Menu.findByPk(item.menuId);

        if (!menuItem || !menuItem.isAvailable) {
            return res.status(400).json({ message: "Menu item not available" });
        }
}

//Inventory check and update
// Deduct inventory when order is created
for (let item of items) {
  const menuItem = await Menu.findByPk(item.menuId);

  if (!menuItem || !menuItem.isAvailable) {
    return res.status(400).json({ message: "Menu item not available" });
  }

  // Check inventory
  const inventory = await Inventory.findOne({
    where: { MenuId: menuItem.id }
  });

  if (!inventory || inventory.stock < item.quantity) {
    return res.status(400).json({
      message: `Insufficient stock for ${menuItem.name}`
    });
  }

  // Deduct stock
  inventory.stock -= item.quantity;
  await inventory.save();

  const itemTotal = menuItem.price * item.quantity;
  totalAmount += itemTotal;

  await OrderItem.create({
    OrderId: order.id,
    MenuId: menuItem.id,
    quantity: item.quantity
  });
}

    // Update total bill
    order.totalAmount = totalAmount;
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id,
      totalAmount
    });

  }catch (error) {
  console.log(error);
  res.status(500).json({
    name: error.name,
    errors: error.errors
  });
}
};


//fetchiing order details
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          attributes: ["quantity"],
          include: [
            {
              model: Menu
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order details" });
  }
};

//Order status update
const completeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "completed";
    await order.save();

    res.status(200).json({
      message: "Order completed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Error completing order" });
  }
};

module.exports = { createOrder, getOrderDetails, completeOrder };