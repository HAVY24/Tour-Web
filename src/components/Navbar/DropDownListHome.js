
import React, { useState } from 'react';
import '../../styles/navbar.css';
import { Select, MenuItem, FormControl, InputLabel, Link } from "@mui/material";

function DropdownListHome({ show }) {
  const [selectedValue, setSelectedValue] = useState("");

  // Hàm để cuộn tới phần tử với id đã xác định
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="dropdown-menu"
      style={{ display: show === "Home" ? "inline-block" : "none" }}
    >
      <div className="dropdown-menu-content">
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li>
            <a href="#" onClick={() => scrollToSection("top-destination")}>
              Top Destination
            </a>
          </li>
          <li>
            <a href="#top-trending" onClick={() => scrollToSection("top-trending")}>
              Top Trending
            </a>
          </li>
          <li>
            <a href="#why-choose" onClick={() => scrollToSection("why-choose")}>
              Why Choose
            </a>
          </li>
          <li>
            <a href="#top-deals" onClick={() => scrollToSection("top-deals")}>
              Today's Top Deals
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownListHome;
