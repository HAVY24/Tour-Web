import React from "react";
import TopDestination from "./TopDestination";
import CitiesSlider from "../../Slideshow/CitiesSlider";
import slides from "../../Slideshow/CitiesSlider-infoList";
import TrendingSection from "./TrendingSection";
import TipSection from "./TipSection";
import WhyChooseSection from "./WhyChooseSection";
import TopDeal from "./TopDealSection";
import ParallaxSection from "./ParallaxSection";

const Home = () => {
  return (
    <div>
      <div style={{}}>
        <CitiesSlider slides={slides} />
      </div>
      <TopDestination />
      <ParallaxSection />
      <TrendingSection />
      <TipSection />
      <WhyChooseSection />
      <TopDeal id="top-deals" />
    </div>
  );
};

export default Home;
