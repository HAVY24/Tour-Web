import React from "react";
import TopDestination from "./TopDestination";
import CitiesSlider from "../Slideshow/CitiesSlider";
import slides from "../Slideshow/CitiesSlider-infoList";
import TrendingSection from "./TrendingSection";

const Home = () => {
  return (
    <div>
      <CitiesSlider slides={slides} />
      <TopDestination />
      <TrendingSection />
    </div>
  );
};

export default Home;
