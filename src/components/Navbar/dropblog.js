import React, { useState } from "react";

function DropdownListBlog({ show }) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div
      className="dropdown-menu"
      style={{ display: show === "Blog" ? "block" : "none" }}
    >
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        <li>
          <a href="#">most likest</a>
        </li>
        <li>
          <a href="#">most shared</a>
        </li>
        <li>
          <a href="#">Water activities</a>
        </li>
        <li>
          <a href="#">Outdoor & sports activities</a>
        </li>
      </ul>
    </div>
  );
}

export default DropdownListBlog;
