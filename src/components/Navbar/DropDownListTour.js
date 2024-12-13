import React, { useState } from "react";
import { MenuItem, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function DropdownListTour({ show }) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [hoveredDomestic, setHoveredDomestic] = useState(false); // Trạng thái hover vào Domestic
  const [hoveredInternational, setHoveredInternational] = useState(false); // Trạng thái hover vào International
  const [isDomesticOpen, setIsDomesticOpen] = useState(false); // Trạng thái mở box con của Domestic
  const [isInternationalOpen, setIsInternationalOpen] = useState(false); // Trạng thái mở box con của International

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Đóng box con khi hover ra ngoài
  const handleMouseLeave = (type) => {
    if (type === "domestic") {
      setHoveredDomestic(false);
    }
    if (type === "international") {
      setHoveredInternational(false);
    }
  };

  // Mở box con khi click vào menu chính
  const handleClickDomestic = () => {
    setIsDomesticOpen(!isDomesticOpen);
  };

  const handleClickInternational = () => {
    setIsInternationalOpen(!isInternationalOpen);
  };

  // Hàm điều hướng với đường dẫn tham số
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        display: show === "Tour" ? "block" : "none",
        position: "absolute",
        backgroundColor: "rgba(240, 240, 240, 0.8)",
        color: "black",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          textAlign: "left",
          marginTop: "10px",
          width: "auto",
          padding: 2,
          backgroundColor: "#f1f1f1",
          borderRadius: 1,
          boxShadow: 3,
          position: "relative",
        }}
        onMouseLeave={() => handleMouseLeave("domestic")}
      >
        {/* Domestic Tour */}
        <MenuItem
          value={10}
          onMouseEnter={() => setHoveredDomestic(true)} // Khi hover vào, thay đổi trạng thái hovered thành true
          onClick={handleClickDomestic} // Khi click vào, mở/đóng box con
          sx={{
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "aliceblue",
              color: "#007bff",
            },
          }}
        >
          Domestic Tour{" "}
        </MenuItem>

        {/* Hiển thị Box chứa các MenuItem (Bắc, Trung, Nam) khi hovered hoặc clicked vào Domestic Tour */}
        {(hoveredDomestic || isDomesticOpen) && (
          <Box
            sx={{
              position: "absolute",
              left: "100%",
              top: 0,
              backgroundColor: "white",
              padding: 1,
              boxShadow: 3,
              borderRadius: 1,
              zIndex: 200,
              width: "100%",
            }}
            onMouseLeave={() => handleMouseLeave("domestic")}
          >
            <MenuItem
              value={30}
              onClick={() => handleNavigate("/NorthSide")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightgreen" },
              }}
            >
              NorthTour
            </MenuItem>
            <MenuItem
              value={31}
              onClick={() => handleNavigate("/EastSide")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightgreen" },
              }}
            >
              MiddleTour
            </MenuItem>
            <MenuItem
              value={32}
              onClick={() => handleNavigate("/SouthSide")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightgreen" },
              }}
            >
              SouthTour
            </MenuItem>
          </Box>
        )}

        {/* International Tour */}
        <MenuItem
          value={20}
          onMouseEnter={() => setHoveredInternational(true)} // Khi hover vào, thay đổi trạng thái hovered thành true
          onClick={handleClickInternational} // Khi click vào, mở/đóng box con
          sx={{
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "aliceblue",
              color: "#007bff",
            },
          }}
        >
          International Tour
        </MenuItem>

        {/* Hiển thị Box chứa các MenuItem (Châu Á, Châu Âu, Châu Mỹ) khi hovered hoặc clicked vào International Tour */}
        {(hoveredInternational || isInternationalOpen) && (
          <Box
            sx={{
              position: "absolute",
              left: "100%",
              top: 0,
              backgroundColor: "white",
              padding: 1,
              boxShadow: 3,
              borderRadius: 1,
              zIndex: 200,
              width: "100%",
            }}
            onMouseLeave={() => handleMouseLeave("international")}
          >
            <MenuItem
              value={40}
              onClick={() => handleNavigate("/AsiaTour")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              AsiaTour
            </MenuItem>
            <MenuItem
              value={41}
              onClick={() => handleNavigate("/EuropeTour")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              EuropeTour
            </MenuItem>
            <MenuItem
              value={42}
              onClick={() => handleNavigate("/AmericaTour")}
              sx={{
                display: "block",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              AmericaTour
            </MenuItem>
          </Box>
        )}
      </Box>
    </FormControl>
  );
}

export default DropdownListTour;
