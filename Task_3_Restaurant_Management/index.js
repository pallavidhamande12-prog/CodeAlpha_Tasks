const express = require("express");
const sequelize = require("./config/Database");

// Import Models
const Menu = require("./Models/Menu");
const Order = require("./Models/Order");
const OrderItem = require("./Models/OrderItem");
const Inventory = require("./Models/Inventory");
const Table = require("./Models/Table");
const Reservation = require("./Models/Reservation");

// Import Model Relations (VERY IMPORTANT)
require("./Models/OrderRelation");
require("./Models/TableReservationRelation");

// Import Routes
const menuRoutes = require("./Routes/menuRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const inventoryRoutes = require("./Routes/inventoryRoutes");
const tableRoutes = require("./Routes/tableRoutes");
const reservationRoutes = require("./Routes/reservationRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
// Use menu routes
app.use("/api", menuRoutes);
// Use order routes
app.use("/api", orderRoutes);
// Use inventory routes
app.use("/api", inventoryRoutes);
// Use table routes
app.use("/api", tableRoutes);
// Use reservation routes
app.use("/api", reservationRoutes);

// Test database connection
sequelize.authenticate()
    .then(() => {   
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//sync Models
sequelize.sync()
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch((err) => {
        console.error("An error occurred while synchronizing the models:", err);
    });

// Test route
app.get("/", (req, res) => {
  res.send("Restaurant Management System API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
