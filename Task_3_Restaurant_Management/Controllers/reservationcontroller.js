const Reservation = require("../Models/Reservation");
const Table = require("../Models/Table");
const { Op } = require("sequelize");

const createReservation = async (req, res) => {
  try {
    await autoFreeTables();
    const { customerName, reservationTime, guests } = req.body;

    //Find tables with sufficient capacity
    const tables = await Table.findAll({
      where: {
        capacity: { [Op.gte]: guests }
      }
    });

    let selectedTable = null;

    //Check time conflict for each table
    for (let table of tables) {
      const conflict = await Reservation.findOne({
        where: {
          TableId: table.id,
          reservationTime: {
            [Op.between]: [
              new Date(reservationTime),
              new Date(
                new Date(reservationTime).getTime() + 2 * 60 * 60 * 1000
              )
            ]
          }
        }
      });

      if (!conflict) {
        selectedTable = table;
        break;
      }
    }

    //If no table available
    if (!selectedTable) {
      return res.status(400).json({
        message: "No table available for this time slot"
      });
    }

    //Create reservation
    const reservation = await Reservation.create({
      customerName,
      reservationTime,
      guests,
      TableId: selectedTable.id
    });

    //Update table status
    selectedTable.status = "occupied";
    await selectedTable.save();

    //Success response
    res.status(201).json({
      message: "Reservation created successfully",
      reservation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating reservation",
      error: error.message
    });
  }
};
// Auto-free tables after reservation duration
const autoFreeTables = async () => {
  const expiredReservations = await Reservation.findAll({
    where: {
      reservationTime: {
        [Op.lt]: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    },
    include: Table
  });

  for (let reservation of expiredReservations) {
    if (reservation.Table && reservation.Table.status === "occupied") {
      reservation.Table.status = "available";
      await reservation.Table.save();
    }
  }
};
setInterval(autoFreeTables, 30 * 60 * 1000); // Run every 30 minutes

//Cancel Reservation
const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByPk(id, {
      include: Table
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    // Free the table
    if (reservation.Table) {
      reservation.Table.status = "available";
      await reservation.Table.save();
    }

    await reservation.destroy();

    res.json({
      message: "Reservation cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error cancelling reservation",
      error: error.message
    });
  }
};

module.exports = { createReservation, cancelReservation };