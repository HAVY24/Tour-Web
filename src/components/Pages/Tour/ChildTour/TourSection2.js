import React, { useEffect, useState } from "react";
import ListCard2 from "../ChildTour/ListCard2";
import { getTours } from "../../../../api/Services/TourAndPackageServices";

export default function TourSection2({ region }) {
  const [allTours, setAllTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await getTours(1, 5, null, region);
        setAllTours(res.tours);
      } catch (ex) {
        alert(ex);
      }
    };
    fetchTours();
  }, []);

  return (
    <div style={{ margin: "50px auto", width: "80%", textAlign: "center" }}>
      <ListCard2 allTours={allTours} />
    </div>
  );
}
