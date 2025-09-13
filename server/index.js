const express = require("express");
const cors = require("cors");
const moviesRouter = require("./api/movies");
const bookingRouter = require("./api/booking");

const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests for testing with Expo
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/booking", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
