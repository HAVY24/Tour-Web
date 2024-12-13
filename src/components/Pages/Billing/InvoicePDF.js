import React from "react";
import { jsPDF } from "jspdf";

const InvoicePDF = ({ invoice }) => {
  // Helper function to format date from JSON
  function formatDate(jsonDate) {
    const timestamp = parseInt(jsonDate.match(/\d+/)[0], 10);
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a company logo (provide the logo path or base64 string)
    const logoUrl = "https://d3omtf52mksen3.cloudfront.net/Packages/a1.jpeg"; // Your image URL
    doc.addImage(logoUrl, "JPEG", 20, 10, 40, 40); // x, y, width, height

    // Company Info Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("VVNA COMPANY", 65, 20); // Adjust position for logo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("450 Le Van Viet Street", 65, 30);
    doc.text("City, State, ZIP", 65, 35);
    doc.text("Phone: 0343-811-543", 65, 40);
    doc.text("Email: phanducan@VVBA.com", 65, 45);

    // Invoice Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 105, 60, { align: "center" });

    // Divider Line after header
    doc.line(20, 65, 190, 65);

    // User Info Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Billed To:", 20, 80);
    doc.text(`${invoice.FirstName} ${invoice.LastName}`, 20, 85);
    doc.text(`${invoice.Address}`, 20, 90);

    // Divider Line after user info
    doc.line(20, 95, 190, 95);

    // Booking Details Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details:", 20, 105);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Booking ID: ${invoice.BookingId}`, 20, 115);
    doc.text(`Booking Date: ${formatDate(invoice.BookingDate)}`, 20, 120);
    doc.text(`Tour Package: ${invoice.Name}`, 20, 125);
    doc.text(`Number of People: ${invoice.NumOfPeople}`, 20, 130);

    // Divider Line after booking details
    doc.line(20, 135, 190, 135);

    // Payment Info Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Information:", 20, 145);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Transaction ID: ${invoice.TransactionId}`, 20, 155);
    doc.text(`Payment Date: ${formatDate(invoice.PaymentDate)}`, 20, 160);
    doc.text(`Payment Method: ${invoice.PaymentMethod}`, 20, 165);
    doc.text(`Payment Amount: $${invoice.PaymentAmount.toFixed(2)}`, 20, 170);
    doc.text(`Payment Status: ${invoice.PaymentStatus}`, 20, 175);

    // Divider Line after payment info
    doc.line(20, 180, 190, 180);

    // Footer Section
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your business!", 105, 195, { align: "center" });
    doc.text("For inquiries, contact us at contact@company.com", 105, 200, {
      align: "center",
    });

    // Save the PDF
    doc.save(`Invoice-${invoice.TransactionId}.pdf`);
  };

  return <button onClick={generatePDF}>Export PDF</button>;
};

export default InvoicePDF;
