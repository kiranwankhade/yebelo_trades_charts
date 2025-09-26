import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function RsiChart({ labels, data, step = 2 }) {
  const displayedLabels = labels.map((t, i) => (i % step === 0 ? t : ""));

  const oversoldLine = Array(labels.length).fill(70);
  const overboughtLine = Array(labels.length).fill(30);

  const chartData = {
    labels: displayedLabels,
    datasets: [
      {
        label: "RSI",
        data,
        borderColor: "green",
        fill: false,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: "Oversold (70)",
        data: oversoldLine,
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Overbought (30)",
        data: overboughtLine,
        borderColor: "#3b82f6",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // legend text color
          font: { size: 13, weight: "bold" },
          padding: 20,
          usePointStyle: true,
          pointStyle: "line",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) =>
            ctx.dataset.label === "RSI"
              ? `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`
              : ctx.dataset.label,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Time" , color: "white" },  ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" }},
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: "RSI", color: "white"  },
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
