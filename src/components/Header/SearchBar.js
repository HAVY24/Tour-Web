import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <TextField 
      variant="outlined"
      placeholder="Search destination or activities"
      size="small"
        sx={{
            margin:'20px',
            width: 300,
            borderRadius: '50px',
            backgroundColor: '#f5f5f5',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px', // Bo tròn các góc để tạo hình oval
              paddingRight: '8px', // Thêm khoảng cách để icon không sát quá
              '& fieldset': {
                borderColor: '#d1d1d1', // Màu của border
              },
              '&:hover fieldset': {
                borderColor: 'orange', // Màu border khi hover
              },
            },
          }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
