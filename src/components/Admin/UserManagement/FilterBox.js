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
        Filter Users:
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Request Status</InputLabel>
        <Select value={filter} onChange={handleChange} label="Request Status">
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
          <MenuItem value="banned">Banned</MenuItem>
          <MenuItem value="softDeleted">Soft Deleted Account</MenuItem>
          <MenuItem value="blockedProfile">Blocked Profile</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBox;
