import React from "react";
import Slide3 from "../../Slideshow/Slide3";
import ImageSection from "./ImageSection";
import "../../../styles/gallery.css";

const Gallery = () => {
  return (
    <div className="contain">
      <Slide3 />
      <ImageSection />
    </div>
  );
};

export default Gallery;
