// Trade.js
const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    shares: {
      type: Number,
      required: true,
      min: 10,
      max: 30,
    },
    price: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
