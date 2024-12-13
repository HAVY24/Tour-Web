import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FilterBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearch = () => {
    onSearch({ searchQuery, searchBy, sortBy });
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        bgcolor: "background.default",
        width: "100%",
        maxWidth: "300px",
        maxHeight: "430px",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          mb: 2,
        }}
      >
        Filter Tours
      </Typography>

      {/* Search Input */}
      <TextField
        fullWidth
        label="Search Tours"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
        }}
      />

      {/* Search By Dropdown */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel id="search-by-label">Search By</InputLabel>
        <Select
          labelId="search-by-label"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="City">City</MenuItem>
          <MenuItem value="Country">Country</MenuItem>
        </Select>
      </FormControl>

      {/* Sort By Dropdown */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        >
          <MenuItem value="created">Created Day (Newest First)</MenuItem>
          <MenuItem value="created_asc">Created Day (Oldest First)</MenuItem>
        </Select>
      </FormControl>

      {/* Search Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          fontWeight: "bold",
          textTransform: "none",
          py: 1,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterBox;
