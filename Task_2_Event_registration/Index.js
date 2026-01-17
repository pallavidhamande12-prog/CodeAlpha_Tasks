const express = require("express");
const app = express();
const sequelize = require("./config/Database");

const User = require("./Modules/User");
const Event = require("./Modules/Event");
const Registration = require("./Modules/Registration");

require("./Modules/Connection");

app.use(express.json());

const PORT = 3000;

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err);
  });

// Endpoint to get event by ID
app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message
    });
  }
});

// Endpoint to get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message
    });
  }
});

//endpoint to view all registrations
app.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      include: [User, Event]
    });

    res.json(registrations);
  } 
  catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations",
      error: error.message
    });
  }
});

//endpoint to cancel a registration
app.delete("/registrations/:id", async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found"
      });
    }

    await registration.destroy();
    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel registration",
      error: error.message
    });
  }
});

// Endpoint to register a user for an event
app.post("/register", async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const registration = await Registration.create({ userId, eventId });

    res.status(201).json({ message: "User registered for event successfully", registration });
  }
  catch (error) {
    res.status(500).json({ message: "Registration Failed.", error: error.message });
  }
});

//Endpoint to create a new user
// Endpoint to create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message
    });
  }
});

// Endpoint to create a new event
app.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create event",
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
