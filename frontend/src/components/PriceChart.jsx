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

export default function PriceChart({ labels, data, step = 2 }) {
  // Limit labels to avoid clutter
  const displayedLabels = labels.map((t, i) => (i % step === 0 ? t : ""));

  const chartData = {
    labels: displayedLabels,
    datasets: [
      {
        label: "Price (SOL)",
        data,
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with opacity
        fill: false,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // legend text color
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(6)} SOL`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time", color: "white" },
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        title: { display: true, text: "Price (SOL)", color: "white" },
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
