import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card2 from "./Card2";


export default function ListCard2({ allTours }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div style={{ width: "90%", margin: "18px auto" }}>
      <Slider {...settings}>
        {allTours.map((tour) => (
          <div key={tour.id}>
            <Card2 item={tour} />
          </div>
        ))}
      </Slider>
    </div>
  );
}