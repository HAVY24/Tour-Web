import React from "react";

import { Link } from "@mui/material";

const distributionUrl = process.env.REACT_APP_DISTRIBUTION_URL;

export default function NotFoundBooking({ styles }) {
  return (
    <div className={styles.noBookingsContainer}>
      <img
        src={`${distributionUrl}/Static/NoBooking.png`} // Add a nice placeholder image
        alt="No bookings"
        style={{ width: "100%" }}
        className={styles.noBookingsImage}
      />
      <p className={styles.noBookings}>
        You haven't made any bookings yet. Explore some amazing tours!
      </p>
      <Link to="/tours" className={styles.exploreToursButton}>
        Explore Tours
      </Link>
    </div>
  );
}
