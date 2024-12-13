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
import { getBookingStatistics } from "../../../../api/Services/BookingServices";
import styles from "../../../../styles/BookingChart.module.css";
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

const BookingChart = () => {
  const [data, setData] = useState(null);
  const [selectedChart, setSelectedChart] = useState("total");
  const [chartType, setChartType] = useState("bar");
  const { year } = useParams();
  const chartRef = useRef(null); // Ref for the chart container

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getBookingStatistics(year);
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

  const totalBookingData = Array(12).fill(0);
  const successfulBookingData = Array(12).fill(0);
  const failedBookingData = Array(12).fill(0);

  data.totalBookingPerMonth.forEach((item) => {
    totalBookingData[item.BookingMonth - 1] = item.BookingCount;
  });

  data.bookingSuccessPerMonth.forEach((item) => {
    successfulBookingData[item.BookingMonth - 1] = item.BookingCount;
  });

  data.bookingFailPerMonth.forEach((item) => {
    failedBookingData[item.BookingMonth - 1] = item.BookingCount;
  });

  const chartData = {
    total: {
      labels: months,
      datasets: [
        {
          label: "Total Bookings",
          data: totalBookingData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(75, 192, 192, 0.6)"
              : "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    },
    successful: {
      labels: months,
      datasets: [
        {
          label: "Successful Bookings",
          data: successfulBookingData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(54, 162, 235, 0.6)"
              : "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
        },
      ],
    },
    failed: {
      labels: months,
      datasets: [
        {
          label: "Failed Bookings",
          data: failedBookingData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    },
    combined: {
      labels: months,
      datasets: [
        {
          label: "Total Bookings",
          data: totalBookingData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(75, 192, 192, 0.6)"
              : "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
        {
          label: "Successful Bookings",
          data: successfulBookingData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(54, 162, 235, 0.6)"
              : "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
        },
        {
          label: "Failed Bookings",
          data: failedBookingData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
        <div className={styles.chartButtons}>
          <button
            onClick={() => setSelectedChart("total")}
            className={`${styles.chartBtn} ${
              selectedChart === "total" ? styles.activeBtn : ""
            }`}
          >
            Total Bookings
          </button>
          <button
            onClick={() => setSelectedChart("successful")}
            className={`${styles.chartBtn} ${
              selectedChart === "successful" ? styles.activeBtn : ""
            }`}
          >
            Successful Bookings
          </button>
          <button
            onClick={() => setSelectedChart("failed")}
            className={`${styles.chartBtn} ${
              selectedChart === "failed" ? styles.activeBtn : ""
            }`}
          >
            Failed Bookings
          </button>
          <button
            onClick={() => setSelectedChart("combined")}
            className={`${styles.chartBtn} ${
              selectedChart === "combined" ? styles.activeBtn : ""
            }`}
          >
            All Data
          </button>
        </div>

        <div ref={chartRef} className={styles.chartDisplay}>
          {chartType === "bar" ? (
            <Bar data={chartData[selectedChart]} options={options} />
          ) : (
            <Line data={chartData[selectedChart]} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingChart;
