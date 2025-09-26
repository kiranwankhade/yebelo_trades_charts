import axios from "axios";

const API = "http://localhost:4000/api";

// /api/trades
export const fetchTrades = () => axios.get(`${API}/trades`).then(r => r.data);


// /api/token/:token
export const fetchTradesByToken = (token) => axios.get(`${API}/trades/${token}`).then(r => r.data);


// /api/token/:token/rsi
export const fetchRsiByToken = (token) => axios.get(`${API}/trades/token/${token}/rsi`).then(r => r.data);