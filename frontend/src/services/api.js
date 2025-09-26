import axios from "axios";

// Local API :http://localhost:4000/api

const API = "https://yebelo-trades-charts-1.onrender.com/api"; 

// /api/trades
export const fetchTrades = () => axios.get(`${API}/trades`).then(r => r.data);


// /api/token/:token
export const fetchTradesByToken = (token) => axios.get(`${API}/trades/${token}`).then(r => r.data);


// /api/token/:token/rsi
export const fetchRsiByToken = (token) => axios.get(`${API}/trades/token/${token}/rsi`).then(r => r.data);