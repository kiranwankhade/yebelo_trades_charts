
# Crypto Trades Dashboard (Fullstack Assignment)

This project is a **full-stack technical assignment** that processes cryptocurrency trade data, calculates **RSI (Relative Strength Index)**, and displays the results in an interactive dashboard.

Although the original assignment suggested **Docker + Redpanda + Rust + Next.js + TypeScript**,  
this implementation uses **Node.js + Express.js (backend)** and **React + Tailwind CSS (frontend)**.  
The **functional outcome** (CSV ingestion → RSI calculation → frontend visualization) remains aligned with the original requirements.

---

## 📌 Features

- Backend:
  - Parses trade data from a CSV file (`trades_data.csv`)
  - Provides REST APIs for:
    - All trades
    - Trades by token address
    - RSI calculation for each token
- Frontend:
  - Built with React + Tailwind CSS
  - Token selector dropdown
  - Price Line Chart
  - RSI Line Chart (with 30/70 overbought & oversold zones)
  - Displays the latest price and RSI value

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js**
- `csv-parser` for CSV ingestion
- Custom `calculateRSI` utility

### Frontend
- **React + Tailwind CSS**
- Chart.js / Recharts for visualizations

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/kiranwankhade/yebelo_trades_charts.git
cd <repo-name>
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Place your `trades_data.csv` file inside the backend folder.

Start server:

```bash
node index.js
```

Server runs on: **[http://localhost:4000](http://localhost:4000)**

#### API Endpoints

* `GET /` → Welcome message
* `GET /api/trades` → Get all trades
* `GET /api/trades/:token` → Get trades by token
* `GET /api/trades/token/:token/rsi` → Get RSI for a token

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Dashboard Preview

* **Token Selector** (choose token to analyze)
* **Price Chart** (price vs time)
* **RSI Chart** (14-period RSI with 30/70 levels)
* **Latest Price + RSI value**

---

## 🚀 How It Works

1. Backend reads `trades_data.csv` and exposes APIs.
2. Frontend fetches trades & RSI data from backend.
3. Charts render prices & RSI in real-time as per selection.

---

## 📌 Notes & Assumptions

* Tech stack differs from the assignment requirements (used **Node/React** instead of **Rust/NextJS**).
* Functional requirements are satisfied:

  * CSV → API → RSI Calculation → Dashboard visualization
* Scaling adjustments (e.g., converting hex price values, timestamp formatting) handled in frontend.

---

## 📹 Submission

* GitHub repo link: `https://github.com/kiranwankhade/yebelo_trades_charts`
* Demo video: Attached separately

---
```
