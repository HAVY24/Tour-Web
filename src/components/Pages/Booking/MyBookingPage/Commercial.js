import React from "react";
import { Link } from "@mui/material";
import styles from "../../../../styles/MyBookingPage.module.css";
const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function Commercial() {
  return (
    <div className={styles.leftSide}>
      <img
        src={`${distributionUrl}/Static/app.png`}
        alt="How to Download App"
        style={{ objectFit: "cover" }}
        className={styles.instructionImage}
      />
      <h2 className={styles.instructionTitle}>How to Buy VVBA Gift Voucher</h2>
      <ol className={styles.instructionList}>
        <li>Choose the occasion</li>
        <li>Select design, amount, and delivery method</li>
        <li>Review and proceed to payment</li>
      </ol>
      <Link href="https://www.traveloka.com/en-id" className={styles.link}>
        Corporate Gift Vouchers also available here.
      </Link>
    </div>
  );
}
