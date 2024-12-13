import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-grid-system";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../../../styles/CreditCard.module.css";
import UserContext from "../../../UserContext";
import { getPaymentCardByUserId } from "../../../api/Services/PaymentServices";

const CreditCard = () => {
  const user = useContext(UserContext);
  const [state, setState] = useState({
    Last4Digits: "",
    FirstName: "",
    LastName: "",
    ExpirationDate: "",
    cvc: "***",
    focus: "",
  });

  function formatDate(dateString) {
    if (!dateString) return "00/00"; // Return a default date if `dateString` is null or undefined
    try {
      const timestamp = parseInt(
        dateString.replace("/Date(", "").replace(")/", "")
      );
      const date = new Date(timestamp);
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month
      const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year
      return `${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "00/00"; // Fallback for invalid date
    }
  }

  useEffect(() => {
    const fetchCard = async () => {
      if (!user?.userId) return;
      try {
        const res = await getPaymentCardByUserId(user.userId);
        if (res) {
          setState({
            Last4Digits: res.Last4Digits || "",
            FirstName: res.FirstName || "",
            LastName: res.LastName || "",
            ExpirationDate: res.ExpirationDate || "",
            cvc: "***",
            focus: "",
          });
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };
    fetchCard();
  }, [user?.userId]);

  return (
    <Container>
      <Cards
        number={"4***********" + (state.Last4Digits || "****")}
        expiry={formatDate(state.ExpirationDate)}
        cvc={state.cvc || "***"}
        name={(state.FirstName || "First") + " " + (state.LastName || "Last")}
        focused={state.focus}
      />
    </Container>
  );
};

export default CreditCard;
