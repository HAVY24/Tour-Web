import React, { useEffect, useState, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
import styles from "../../../../styles/BookingChart.module.css";
import { getPostStatistics } from "../../../../api/Services/PostServices";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const PostBarChart = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const { year } = useParams();
  const chartRef = useRef(null); // Ref for the chart container

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getPostStatistics(year);
      setData(res);
    };
    fetchStatistics();
  }, []);

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const totalPost = Array(12).fill(0);

  data.postPerMonth.forEach((item) => {
    totalPost[item.PostMonth - 1] = item.PostCount;
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        data: totalPost,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(20, 20, 207, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(99, 255, 132, 0.6)",
          "rgba(205, 255, 86, 0.6)",
          "rgba(162, 54, 235, 0.6)",
          "rgba(102, 153, 255, 0.6)",
          "rgba(203, 201, 207, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: "",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const exportToPDF = async () => {
    const chartElement = chartRef.current;
    const canvas = await html2canvas(chartElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 280, 150); // Adjust dimensions as needed
    pdf.save(`Booking_Chart_${year}.pdf`);
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
        <button onClick={exportToPDF} className={styles.exportButton}>
          Export to PDF
        </button>
      </div>
      <div className={styles.chartContent}>
        Total Posts Per Month
        <div ref={chartRef} className={styles.chartDisplay}>
          {chartType === "bar" ? (
            <Bar data={chartData} options={options} />
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBarChart;
