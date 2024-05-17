// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const tradeRoutes = require("./controller/tradeRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://manvensingh07:j0dM0y9waKB3fCX2@basysbackend.v24pwq2.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/trades", tradeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
