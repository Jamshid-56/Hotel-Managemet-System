const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const Room = require("./models/room")(sequelize, require("sequelize").DataTypes);
const Item = require("./models/item")(sequelize, require("sequelize").DataTypes);
const Booking = require("./models/booking")(sequelize, require("sequelize").DataTypes);

// Sync database
sequelize.sync()
    .then(() => {
        console.log("Database synced!");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes for rooms
app.post("/rooms", async(req, res) => {
    try {
        const { roomType, pricePerNight } = req.body;
        const room = await Room.create({ roomType, pricePerNight });
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: "Error creating room", error });
    }
});

app.get("/rooms", async(req, res) => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ message: "Error fetching rooms", error });
    }
});

// Routes for items
app.post("/items", async(req, res) => {
    try {
        const { itemName, pricePerUnit, quantityAvailable } = req.body;
        const item = await Item.create({ itemName, pricePerUnit, quantityAvailable });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: "Error creating item", error });
    }
});

app.get("/items", async(req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: "Error fetching items", error });
    }
});

// Route to rent a room (Booking)
app.post("/bookings", async(req, res) => {
    try {
        const { customerName, roomId } = req.body;
        const room = await Room.findByPk(roomId);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const rentStartTime = new Date();
        const rentEndTime = new Date(rentStartTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

        const booking = await Booking.create({
            customerName,
            roomId,
            rentStartTime,
            rentEndTime,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: "Error creating booking", error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});