const express = require("express");
const cors = require("cors");

const moviesRouter = require("./api/movies");
const bookingRouter = require("./api/booking");
const foodBeverageRouter = require("./api/foodBeverage");
const paymentRouter = require("./api/payment");
const profileRouter = require("./api/profile");

const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests for testing with Expo
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/booking", bookingRouter);
app.use("/foodbeverage", foodBeverageRouter);
app.use("/payment", paymentRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
