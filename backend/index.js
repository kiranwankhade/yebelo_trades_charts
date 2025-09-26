const express = require("express");
const fs = require("fs");
const cors = require("cors");
const csv = require("csv-parser");
const app = express();

const { calculateRSI } = require("./services/rsiCalc");

const PORT = 4000;

app.use(cors());

const trades = [];

fs.createReadStream("./trades_data.csv")
  .pipe(csv())
  .on("data", (data) => trades.push(data))
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

// Welcome
app.get("/", (req, res) => {
  res.send("welcome trades");
});

//   Get the all trades
app.get("/api/trades", (req, res) => {
  res.json(trades);
});

// API: Get trades by token address
app.get("/api/trades/:token", (req, res) => {
  const token = req.params.token;
  const filtered = trades.filter((t) => t.token_address === token);
  res.json(filtered);
});

//   RSI Calculation
app.get("/api/trades/token/:token/rsi", (req, res) => {
  const token = req.params.token;
  const tradesData = trades.filter((t) => t.token_address === token);
  if (!tradesData.length)
    return res.status(404).json({ error: "Token not found" });

  const prices = trades
    .sort((a, b) => new Date(a.block_time) - new Date(b.block_time))
    .map((t) => Number(t.price_in_sol));

  console.log("prices:", prices);
  const rsi = calculateRSI(prices, 14);

  res.json({ token, rsi });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
