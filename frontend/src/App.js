import React, { useEffect, useState } from "react";
import {
  fetchTrades,
  fetchTradesByToken,
  fetchRsiByToken,
} from "./services/api";
import TokenSelector from "./components/TokenSelector";
import PriceChart from "./components/PriceChart";
import RsiChart from "./components/RsiChart";

function App() {
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState("");
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [rsi, setRsi] = useState([]);

  useEffect(() => {
    // console.log('fetchTrades():', fetchTrades())
    fetchTrades().then((all) => {
      console.log("all:", all);
      const uniq = [...new Set(all.map((t) => t.token_address))];
      console.log("uniq:", uniq);
      setTokens(uniq);
      setSelected(uniq[0]);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;

    fetchTradesByToken(selected).then((trades) => {
      const sorted = trades.sort(
        (a, b) => a.block_time - b.block_time // numbers in seconds
      );

      // Convert prices to numbers
      const numericPrices = sorted.map((t) => {
        let price = t.price_in_sol;

        // If hex string like '0x...' → convert to number
        if (typeof price === "string" && price.startsWith("0x")) {
          price = parseInt(price, 16);
        } else {
          price = Number(price);
        }

        // Convert lamports (or very small units) → SOL
        return price * 1e9; // adjust scaling if needed
      });

      // Convert timestamps to readable time
      const readableTimes = sorted.map((t) => {
        const date = new Date(t.block_time * 1000); // multiply by 1000
        return date.toLocaleTimeString("en-GB", { hour12: false });
      });

      console.log("numericPrices:", numericPrices);
      setPrices(numericPrices);
      setTimestamps(readableTimes);
    });

    fetchRsiByToken(selected).then((res) =>
      setRsi(res.rsi?.map((v) => Number(v)))
    );
  }, [selected]);

  const latestPrice = prices.length ? prices[prices.length - 1] : null;
  console.log("latestPrice:", latestPrice);
  const latestRsi = rsi?.length ? rsi[rsi.length - 1] : null;
  console.log("latestRsi:", latestRsi);

  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#616175]">
          Crypto Dashboard
        </h1>

        <div className="flex justify-center mb-6">
          <TokenSelector
            tokens={tokens}
            selected={selected}
            onChange={setSelected}
          />
        </div>

        {/* Charts */}
        <div className="flex flex-col justify-center items-center gap-6 mt-6">
        <h2 className="font-semibold text-lg text-center text-black underline underline-offset-4"> Line Chart For Price (SOL)</h2>
          {/* Price Chart */}
          <div className="w-full max-w-4xl p-4 border rounded shadow-sm bg-[#0f1824] h-64 sm:h-96">
  <PriceChart labels={timestamps} data={prices} />
</div>
          
          {/* RSI Chart */}
          <h2 className="font-semibold text-lg text-center text-black underline underline-offset-4"> Line Chart For RSI</h2>
          <div className="w-full max-w-4xl p-4 border rounded shadow-sm bg-[#0f1824] h-64 sm:h-96">
            <RsiChart labels={timestamps} data={rsi} step={2} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
