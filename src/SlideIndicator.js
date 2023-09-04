import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const SlideIndicator = ({
  totalSlides,
  activeIndex,
  prevSlide,
  nextSlide,
  slideNumber
}) => {
  const indicators = Array.from({ length: totalSlides }, (_, index) => (
    <div
      key={index}
      className={`indicator ${activeIndex === index ? "active" : ""}`}
      onClick={() => {
        slideNumber(index);
      }}
    />
  ));

  return (
    <div className="slide-indicator">
      <div className="controls">
        <FaArrowLeft
          className="nav-icon"
          onClick={() => {
            prevSlide();
          }}
        />

        <div className="indicators">{indicators}</div>

        <FaArrowRight
          className="nav-icon"
          onClick={() => {
            nextSlide();
          }}
        />
      </div>
    </div>
  );
};

export default SlideIndicator;
