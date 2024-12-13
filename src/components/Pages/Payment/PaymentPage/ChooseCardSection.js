import React, { useState } from "react";

export default function ChooseCardSection({
  paymentOptions,
  styles,
  getSelectedPayment,
}) {
  const [selectedPayment, setSelectedPayment] = useState(null); // State to manage selected payment method
  getSelectedPayment(selectedPayment);
  return (
    <>
      <h5 className={`${styles.sectionTitle} pt-4 text-primary`}>
        Choose Your Payment Method
      </h5>
      <div className="pt-3">
        {paymentOptions.map((option) => (
          <div
            key={option.method}
            className={`d-flex flex-row pb-3 align-items-center rounded-4 shadow-sm`}
            onClick={() => setSelectedPayment(option.method)}
            style={{
              backgroundColor:
                selectedPayment === option.method ? "#d1e7ff" : "#f8f9fa",
              padding: "12px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            <div className="w-100 d-flex align-items-center">
              <img
                src={option.image}
                alt={option.label}
                className="pe-3 rounded"
                style={{ width: "150px", height: "100px" }}
              />
              <div>
                <p className="mb-0 fw-bold">{option.label}</p>
                <div className="text-muted">
                  {option.method === "cash"
                    ? "Pay at Ticket Checkpoint"
                    : `****${option.lastDigits}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
