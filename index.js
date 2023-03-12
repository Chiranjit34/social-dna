const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const roomsRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URL
// const mongo_url = "mongodb://127.0.0.1:27017/hotel"

app.use(express.json());
app.use(cors());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});