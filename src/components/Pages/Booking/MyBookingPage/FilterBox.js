import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const FilterBox = ({ handleFilter }) => {
  const [filter, setFilter] = useState("all");

  const handleChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    handleFilter(selectedFilter);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom="20px"
    >
      <Typography variant="h6" marginRight="10px">
        Filter Requests:
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Request Status</InputLabel>
        <Select value={filter} onChange={handleChange} label="Request Status">
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          <MenuItem value="waiting">Approving Booking</MenuItem>
          <MenuItem value="pending">Pending Booking</MenuItem>
          <MenuItem value="accepted">Accepted Booking</MenuItem>
          <MenuItem value="unaccepted">Unaccepted Booking</MenuItem>
          <MenuItem value="cancel">Canceled Booking</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBox;
