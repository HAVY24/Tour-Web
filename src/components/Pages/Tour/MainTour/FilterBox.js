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
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FilterBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState([1, 1000]);

  const handleSearch = () => {
    onSearch({ searchQuery, searchBy, sortBy, priceRange });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: "750px",
        minHeight: "935px",
        textAlign: "center",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          mb: 3,
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
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
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
            borderRadius: 2,
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
            borderRadius: 2,
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
        >
          <MenuItem value="created">Created Day (Newest First)</MenuItem>
          <MenuItem value="created_asc">Created Day (Oldest First)</MenuItem>
        </Select>
      </FormControl>

      {/* Price Range Slider */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          color: "text.secondary",
          mb: 1,
        }}
      >
        Price Range ($)
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={1}
        max={1000}
        step={50}
        sx={{
          mb: 3,
          color: "primary.main",
          "& .MuiSlider-thumb": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        ${priceRange[0]} - ${priceRange[1]}
      </Typography>

      {/* Search Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          fontWeight: "bold",
          textTransform: "none",
          py: 1.5,
          mt: 3,
          borderRadius: 2,
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease",
          "&:hover": {
            backgroundColor: "primary.dark",
            transform: "scale(1.02)",
          },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterBox;
