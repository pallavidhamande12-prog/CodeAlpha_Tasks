const Inventory = require("../Models/Inventory");
const Menu = require("../Models/Menu");

// Add or update stock
const addInventory = async (req, res) => {
  try {
    const { menuId, stock } = req.body;

    const menuItem = await Menu.findByPk(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    let inventory = await Inventory.findOne({ where: { MenuId: menuId } });

    if (!inventory) {
      inventory = await Inventory.create({
        itemName: menuItem.name,
        stock,
        MenuId: menuId
      });
    } else {
      inventory.stock += stock;
      await inventory.save();
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      inventory
    });

  } catch (error) {
    res.status(500).json({ message: "Inventory error" });
  }
};

module.exports = { addInventory };
