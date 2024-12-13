import React, { useState, useEffect } from "react";
import { MDBIcon, MDBInput } from "mdb-react-ui-kit";

export default function ChooseVoucherSection({
  vouchers,
  styles,
  getSelectedVoucer,
}) {
  const [voucherCode, setVoucherCode] = useState(""); // Current voucher code
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Selected voucher object
  const [selectedDiscount, setSelectedDiscount] = useState(0); // Selected discount

  // Notify parent of the selected discount when it changes
  useEffect(() => {
    getSelectedVoucer(selectedDiscount);
  }, [selectedDiscount, getSelectedVoucer]);

  // Handle selection of a voucher
  const handleVoucherClick = (voucher) => {
    setVoucherCode(voucher.Code);
    setSelectedVoucher(voucher.Code);
    setSelectedDiscount(voucher.Discount);
  };

  // Styling variables for better reuse
  const voucherStyles = {
    container: {
      cursor: "pointer",
      padding: "12px",
      borderRadius: "12px",
      transition: "background-color 0.3s, box-shadow 0.3s",
    },
    selected: {
      backgroundColor: "#d8f3dc", // Soft green for a positive and elegant highlight
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    default: {
      backgroundColor: "#f8f9fa", // Subtle light gray
    },
  };

  const sectionBackgroundStyle = {
    backgroundColor: "#fdfdfd", // Clean white with a slight warmth
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.05)", // Subtle shadow for depth
    border: "1px solid #e9ecef", // Soft border for structure
  };

  const titleStyle = {
    fontWeight: "bold",
    color: "#495057", // Neutral dark gray for readability
  };

  return (
    <>
      <h5 className={`${styles.sectionTitle} pt-5`} style={titleStyle}>
        Choose a Voucher
      </h5>
      <div className="pt-3" style={sectionBackgroundStyle}>
        {!vouchers && <p>No Voucher</p>}
        {vouchers &&
          vouchers.map((voucher) => (
            <div
              key={voucher.Code}
              role="button"
              aria-pressed={selectedVoucher === voucher.Code}
              className="d-flex align-items-center mb-3 shadow-sm"
              onClick={() => handleVoucherClick(voucher)}
              style={{
                ...voucherStyles.container,
                ...(selectedVoucher === voucher.Code
                  ? voucherStyles.selected
                  : voucherStyles.default),
              }}
            >
              <MDBIcon
                fas
                icon="ticket-alt"
                size="lg"
                className="text-primary pe-2" // Changed to a calm blue
              />
              <p
                className="mb-0"
                style={{ color: "#343a40", fontSize: "0.95rem" }}
              >
                {voucher.Title} - Code: <b>{voucher.Code}</b>
              </p>
              <div
                className="ms-auto text-success fw-bold"
                style={{ fontSize: "0.9rem" }}
              >
                -${voucher.Discount}
              </div>
            </div>
          ))}
        <MDBInput
          label="Enter Voucher Code"
          placeholder="Enter your voucher code here"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="mt-3"
          style={{
            borderRadius: "10px",
            border: "1px solid #dee2e6", // Neutral gray for contrast
            padding: "10px",
            backgroundColor: "#ffffff", // Clean white
            color: "#495057", // Dark gray for better readability
          }}
        />
      </div>
    </>
  );
}
