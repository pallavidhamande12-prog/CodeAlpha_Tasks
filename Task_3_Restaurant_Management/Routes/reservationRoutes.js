const express = require("express");
const router = express.Router();
const { createReservation, cancelReservation } = require("../Controllers/reservationcontroller");

router.post("/reservations", createReservation);
router.delete("/:id", cancelReservation);

module.exports = router;
