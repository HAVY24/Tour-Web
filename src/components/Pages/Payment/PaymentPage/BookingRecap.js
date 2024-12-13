import React from "react";
import { MDBCol } from "mdb-react-ui-kit";

export default function BookingRecap({ paymentInfo }) {
  return (
    <MDBCol md="5" xl="4" offsetXl="1">
      <div className="py-4 d-flex justify-content-end"></div>
      <div
        className="rounded d-flex flex-column p-2"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="p-2 me-3">
          <h4>Booking Recap</h4>
        </div>
        <div className="border-top px-2 mx-2"></div>
        <div className="p-2 d-flex pt-3">
          <MDBCol size="8">Number of people</MDBCol>
          <div className="ms-auto">
            <b>{paymentInfo.NumOfPeople}</b>
          </div>
        </div>
        <div className="p-2 d-flex">
          <MDBCol size="8">
            Price <span className="fa fa-question-circle text-dark"></span>
          </MDBCol>
          <div className="ms-auto">
            <b>
              {paymentInfo.NumOfPeople} x ${paymentInfo.pricePerson} = $
              {paymentInfo.totalTemp}
            </b>
          </div>
        </div>
        <div className="border-top px-2 mx-2"></div>

        <div className="p-2 d-flex">
          <MDBCol size="8">
            Total Discount{" "}
            <span className="fa fa-question-circle text-dark"></span>
          </MDBCol>
          <div className="ms-auto">
            <b>-${paymentInfo.totalDiscount}</b>
          </div>
        </div>
        <div className="p-2 d-flex">
          <MDBCol size="8">
            VAT <span className="fa fa-question-circle text-dark"></span>
          </MDBCol>
          <div className="ms-auto">
            <b>+${paymentInfo.VATCost}</b>
          </div>
        </div>
        <div className="border-top px-2 mx-2"></div>
        <div className="p-2 d-flex pt-3">
          <MDBCol size="8">
            <b>Total</b>
          </MDBCol>
          <div className="ms-auto">
            <b className="text-success">${paymentInfo.total}</b>
          </div>
        </div>
      </div>
    </MDBCol>
  );
}
