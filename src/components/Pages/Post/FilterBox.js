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
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel>Filter Posts</InputLabel>
        <Select value={filter} onChange={handleChange} label="Request Status">
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          <MenuItem value="asc">Post date ascending</MenuItem>
          <MenuItem value="desc">Post date decreasing</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBox;
