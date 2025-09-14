const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const moviesRouter = require("./api/movies");
const bookingRouter = require("./api/booking");
const foodBeverageRouter = require("./api/foodBeverage");
const paymentRouter = require("./api/payment");
const profileRouter = require("./api/profile");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

const seatStatus = require("./module/seatData");
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/movies", moviesRouter);
app.use("/booking", bookingRouter);
app.use("/foodbeverage", foodBeverageRouter);
app.use("/payment", paymentRouter);
app.use("/profile", profileRouter);

// Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send initial seat state
  socket.on("join_hall", (hallId) => {
    socket.join(hallId);
    socket.emit("seat_state", seatStatus[hallId]);
  });

  // Handle seat selection
  socket.on("select_seat", ({ hallId, seatId }) => {
    if (seatStatus[hallId][seatId] === "vacant") {
      seatStatus[hallId][seatId] = "locked";
      io.to(hallId).emit("seat_state_update", { seatId, status: "locked" });
    }
  });

  // Handle seat release (e.g., user unselects or leaves)
  socket.on("release_seat", ({ hallId, seatId }) => {
    seatStatus[hallId][seatId] = "vacant";
    io.to(hallId).emit("seat_state_update", { seatId, status: "vacant" });
  });

  // Booking confirmed
  socket.on("book_seat", ({ hallId, seatId }) => {
    seatStatus[hallId][seatId] = "booked";
    io.to(hallId).emit("seat_state_update", { seatId, status: "booked" });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
