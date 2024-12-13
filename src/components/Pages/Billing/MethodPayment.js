import React from "react";
import styles from "../../../styles/MethodPayment.module.css"; // Sử dụng CSS Module

const Card = ({ logoSrc, cardNumber }) => {
    // Chỉ lấy 4 số cuối và thêm dấu *
    const maskedNumber =
        cardNumber && cardNumber.length >= 4
            ? `**** **** **** ${cardNumber.slice(-4)}`
            : "Invalid Number";

    return (
        <div style={{ marginTop: '10px' }}>
            <div className={styles.card}>
                <img src={logoSrc} alt="logo" />
                <span className={styles["card-number"]}>{maskedNumber}</span>
            </div>
        </div>

    );
};

export default Card;
