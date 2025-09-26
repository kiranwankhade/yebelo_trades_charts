function calculateRSI(prices, period = 14) {
    if (prices.length < period) {
        return []
    };
  
    let gains = 0, losses = 0;

    for (let i = 1; i <= period; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff > 0) {
        gains += diff;
      }
      else {
        losses -= diff
      };
    }
    
    let avgGain = gains / period;
    let avgLoss = losses / period;
   
    const rsis = []; 

    for (let i = period+1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff > 0) {
        avgGain = (avgGain * (period - 1) + diff) / period;
        avgLoss = (avgLoss * (period - 1)) / period;
      } else {
        avgGain = (avgGain * (period - 1)) / period;
        avgLoss = (avgLoss * (period - 1) - diff) / period;
      }
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsis.push(100 - 100 / (1 + rs));
    }
    return rsis;
  }
  
  module.exports = { calculateRSI };
  