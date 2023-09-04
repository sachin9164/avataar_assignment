import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import SlideIndicator from "./SlideIndicator";
import Rectangle1 from "./assets/RectangleR1.svg";
import Rectangle2 from "./assets/RectangleR2.svg";
import Rectangle3 from "./assets/RectangleR3.svg";
import Rectangle4 from "./assets/RectangleR4.svg";
import Rectangle6 from "./assets/RectangleR6.svg";
import Rectangle7 from "./assets/RectangleR7.svg";

const getTouches = (evt) => {
  return evt.touches || evt.originalEvent.touches;
};

export default class RotateCarousel extends Component {
  constructor() {
    super();
    this.state = {
      goToSlide: 0,
      offsetRadius: 2,
      showNavigation: false,
      enableSwipe: true,
      config: config.gentle,
      index: 1
    };
    this.update = this.update.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }
  slides = [
    {
      key: 1,
      content: <img src={Rectangle1} alt="1" />
    },
    {
      key: 2,
      content: <img src={Rectangle2} alt="2" />
    },
    {
      key: 3,
      content: <img src={Rectangle3} alt="3" />
    },
    {
      key: 4,
      content: <img src={Rectangle4} alt="4" />
    },
    {
      key: 5,
      content: <img src={Rectangle6} alt="5" />
    },
    {
      key: 6,
      content: <img src={Rectangle7} alt="5" />
    }
  ].map((slide, index) => {
    return {
      ...slide,
      onClick: () => this.setState({ goToSlide: index, index: index })
    };
  });

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    });
  };

  handleTouchStart = (evt) => {
    if (!this.state.enableSwipe) {
      return;
    }

    const firstTouch = getTouches(evt)[0];
    this.setState({
      ...this.state,
      xDown: firstTouch.clientX,
      yDown: firstTouch.clientY
    });
  };

  handleTouchMove = (evt) => {
    if (!this.state.enableSwipe || (!this.state.xDown && !this.state.yDown)) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.state.xDown - xUp;
    let yDiff = this.state.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        this.setState({
          goToSlide: this.state.goToSlide + 1,
          xDown: null,
          yDown: null
        });
      } else {
        /* right swipe */
        this.setState({
          goToSlide: this.state.goToSlide - 1,
          xDown: null,
          yDown: null
        });
      }
    }
  };
  update(nextState) {
    this.setState({
      goToSlide: nextState || 0
    });
  }
  nextSlide() {
    if (this.slides.length - 1 > this.state.goToSlide) {
      this.setState({
        goToSlide: this.state.goToSlide + 1
      });
    } else {
      this.setState({
        goToSlide: 0
      });
    }
  }
  prevSlide() {
    if (
      this.state.goToSlide + 1 <= this.slides.length &&
      this.state.goToSlide > 0
    ) {
      this.setState({
        goToSlide: this.state.goToSlide - 1
      });
    } else {
      this.setState({
        goToSlide: this.slides.length - 1
      });
    }
  }
  render() {
    return (
      <div
        style={{ width: "80%", height: "500px", margin: "0 auto" }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        className="carousel"
      >
        <Carousel
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        <div
          style={{
            margin: "0 auto",
            marginTop: "2rem",
            width: "50%",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <SlideIndicator
            totalSlides={this.slides.length}
            activeIndex={this.state.goToSlide}
            slideNumber={this.update}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
          />
        </div>
      </div>
    );
  }
}
