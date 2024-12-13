import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import styles from "../../../../styles/BookingChart.module.css";
import { getRevenueStatistics } from "../../../../api/Services/PaymentServices";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

const RevenueYearChart = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getRevenueStatistics(2024);
      setData(res);
    };
    fetchStatistics();
  }, []);

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const years = ["2022", "2023", "2024"];

  const RevenuePerYear = Array(3).fill(0);

  data.revenuePerYear.forEach((item) => {
    RevenuePerYear[item.Year - 2022] = item.Revenue;
  });

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Revenue",
        data: RevenuePerYear,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets[0];
            return chart.data.labels.map((label, index) => ({
              text: `${label}`,
              fillStyle: datasets.backgroundColor[index],
              hidden: false,
            }));
          },
        },
      },
    },
    scales:
      chartType === "pie"
        ? {}
        : {
            y: {
              beginAtZero: true,
            },
          },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartSidebar}>
        <button
          onClick={() => setChartType("bar")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "bar" ? styles.activeSidebarBtn : ""
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "line" ? styles.activeSidebarBtn : ""
          }`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "pie" ? styles.activeSidebarBtn : ""
          }`}
        >
          Pie Chart
        </button>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.chartDisplay}>
          {chartType === "bar" && <Bar data={chartData} options={options} />}
          {chartType === "line" && <Line data={chartData} options={options} />}
          {chartType === "pie" && <Pie data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default RevenueYearChart;
