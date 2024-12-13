import React, { useEffect, useContext, useState } from "react";
import styles from "../../../styles/InvoiceList.module.css";
import { getPayment } from "../../../api/Services/PaymentServices";
import UserContext from "../../../UserContext";
import InvoicePDF from "./InvoicePDF"; // Import the new component

const InvoiceList = () => {
  const user = useContext(UserContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!user?.userId) return;

      const res = await getPayment(user.userId);
      setInvoices(res);
    };
    fetchPayment();
  }, [user.userId]);

  function formatDate(jsonDate) {
    const date = new Date(jsonDate);

    const formattedDate = date.toLocaleDateString("en-GB", {
      timeZone: "Asia/Bangkok",
    });
    const formattedTime = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Bangkok",
    });

    return `${formattedDate.replace(/\//g, "-")} ${formattedTime}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Invoices</h3>
        <button className={styles.viewAllButton}>VIEW ALL</button>
      </div>
      <ul
        className={styles.invoiceList}
        style={{
          maxHeight: "300px",
          overflowY: invoices.length > 5 ? "scroll" : "visible",
        }}
      >
        {invoices.map((invoice, index) => (
          <li key={index} className={styles.invoiceItem}>
            <div>
              <p className={styles.date}>{formatDate(invoice.PaymentDate)}</p>
              <p className={styles.id}>{invoice.TransactionId}</p>
            </div>
            <div className={styles.amountContainer}>
              <p className={styles.amount}>${invoice.PaymentAmount}</p>
              <InvoicePDF invoice={invoice} /> {/* Render the PDF component */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
