import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TopDealCard from "./TopDealCard";
import {
  getTourPackages,
  getTours,
} from "../../../api/Services/TourAndPackageServices";
import styles from "../../../styles/styles.module.css";

const TopDealSlider = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours(1, 5, null, "");
        setTours(data.tours);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTours();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="styles.sliderContainer">
    <Slider {...settings}>
      {tours.map((deal, index) => (
        <TopDealCard key={index} item={deal} />
      ))}
    </Slider>
    </div>
  );
};

export default TopDealSlider;
