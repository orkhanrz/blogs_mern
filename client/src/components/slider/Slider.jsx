import React from "react";
import "./Slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Slider({ featured }) {
  const scroll = (direction) => {
    let width = direction * 540;

    document
      .querySelector(".homeBannerSliderItems")
      .scrollBy({ left: width, behavior: "smooth" });
  };

  return (
    <div className="homeBannerSlider">
      <span
        className="homeBannerSliderButton leftArrow"
        onClick={() => scroll(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      <div className="homeBannerSliderItems">
        {featured.map((item) => {
          return (
            <div className="homeBannerSliderItem" key={item._id}>
              <div className="homeBannerSliderItemImage">
                <img src={item.img} alt="banner item" />
              </div>
              <div className="homeBannerSliderItemInfo">
                <h1 className="title">{item.title}</h1>
                <span className="date">{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
      <span
        className="homeBannerSliderButton rightArrow"
        onClick={() => scroll(1)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </div>
  );
}

export default Slider;
