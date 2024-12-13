import Imagelist1 from "./ImageList1";
import Imagelist2 from "./ImageList2";
import Imagelist3 from "./ImageList3";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";

export default function ImageSection() {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const components = [
    <Imagelist1 />,
    <Imagelist2 />,
    <Imagelist3 />,
    <Imagelist1 />,
    <Imagelist2 />,
    <Imagelist3 />,
    <Imagelist1 />,
    <Imagelist2 />,
    <Imagelist3 />,
    <Imagelist1 />,
  ];

  return (
    <div style={{ marginTop: "-100px" }}>
      <div style={{ marginLeft: "800px", marginBottom: "50px" }}>
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>

      {components[page - 1]}

      <div style={{ marginLeft: "800px", marginBottom: "50px" }}>
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
}
