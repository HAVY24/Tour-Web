import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../../UserContext";
import { getPayment } from "../../../api/Services/PaymentServices";

const OrderSummary = ({ styles }) => {
  const [transactions, setTransactions] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!user?.userId) return;

      const res = await getPayment(user.userId);
      setTransactions(res);
    };
    fetchTransaction();
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
    <div className={styles.transactionContainer}>
      <h1>Your Transactions</h1>
      <div
        className={styles.transactions}
        style={{
          maxHeight: "400px", // Adjust maxHeight as needed
          overflowY: transactions.length > 5 ? "scroll" : "visible",
        }}
      >
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transaction}>
            <div className={styles.transactionHeader}>
              <span>{formatDate(transaction.PaymentDate)}</span>
            </div>
            <div className={styles.transactionBody}>
              <span className={styles.description}>{transaction.Name}</span>
              <span
                className={`${styles.amount} ${
                  transaction.PaymentStatus == "success"
                    ? styles.amountNegative
                    : styles.amountPositive
                }`}
              >
                {transaction.PaymentStatus == "fail"
                  ? `+ $${transaction.PaymentAmount}`
                  : `- $${transaction.PaymentAmount}`}
              </span>
            </div>
            <div className={styles.transactionStatus}>
              {transaction.PaymentStatus === "fail" ? (
                <span className={styles.pending}>Failed</span>
              ) : (
                <span className={styles.completed}>Success</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
