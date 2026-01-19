const Menu = require("../Models/Menu");

//Add new menu item 
const addMenuItem = async (req, res) => {
    try {
        const { name, price, category, isAvailable } = req.body;

        //Basic validation
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Name, price, and category are required." });
        }

        //Create new menu item        
        const menuItem = await Menu.create({
            name,
            price,
            category,
            isAvailable,
        });

        res.status(201).json({
            message: "Menu item added successfully",
            data: menuItem,
        });
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
};

// Get all menu items (Customer view)
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.findAll({
      where: { isAvailable: true }
    });

    res.status(200).json({
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching menu items",
      error: error.message,
    });
  }
};

// Update menu item availability
const updateMenuAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const menuItem = await Menu.findByPk(id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    menuItem.isAvailable = isAvailable;
    await menuItem.save();

    res.status(200).json({
      message: "Menu availability updated successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating menu availability",
      error: error.message,
    });
  }
};

module.exports = {
    addMenuItem,
    getAllMenuItems,
    updateMenuAvailability,
};  