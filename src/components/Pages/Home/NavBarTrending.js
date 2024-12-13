import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ListTrendingCardTour from "./ListTrendingCardTour";
import ListTrendingCardHotel from "./ListTrendingCardHotel";
import ListTrendingCardActivity from "./ListTrendingCardActivity";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 500,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Tour" />
          <BottomNavigationAction label="Hotel" />
          <BottomNavigationAction label="Activity" />
        </BottomNavigation>
      </Box>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        {value === 0 && <ListTrendingCardTour />}
        {value === 1 && <ListTrendingCardHotel />}
        {value === 2 && <ListTrendingCardActivity />}
      </div>
    </div>
  );
}
