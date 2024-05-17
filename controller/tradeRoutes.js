// tradeRoutes.js
const express = require("express");
const Trade = require("../models/Trade");

const router = express.Router();

// POST /trades endpoint
router.post("/", async (req, res) => {
  try {
    let trade_body = req.body
    const trade = new Trade(trade_body);
    const latestTrade = await Trade.findOne({}, {}, { sort: { id: -1 } });
    trade.id = latestTrade ? latestTrade.id + 1 : 1;
    await trade.save();
    res.status(201).json(trade);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating trade" });
  }
});

// GET /trades endpoint
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.type) query.type = req.query.type;
    if (req.query.user_id) query.user_id = req.query.user_id;
    const trades = await Trade.find(query).sort({ id: 1 });
    res.status(200).json(trades);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching trades" });
  }
});

// GET /trades/:id endpoint
router.get("/:id", async (req, res) => {
  try {
    const trade = await Trade.findOne({id:req.params.id});
    if (!trade) {
      res.status(404).send("ID not found");
    } else {
      res.status(200).json(trade);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching trade" });
  }
});

// DELETE /trades/:id endpoint
router.delete("/:id", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

// PUT /trades/:id endpoint
router.put("/:id", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

// PATCH /trades/:id endpoint
router.patch("/:id", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

module.exports = router;
