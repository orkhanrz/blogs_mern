import React from "react";
import "./Slider.css";

import dayjs from 'dayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Slider({ featured }) {
  const scroll = (direction) => {
    let width = direction * 440;

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
            <Link to={`/blogs/${item._id}`} className="homeBannerSliderItem" key={item._id}>
              <div className="homeBannerSliderItemImage">
                <img src={item.image} alt="banner item" />
              </div>
              <div className="homeBannerSliderItemInfo">
                <h1 className="title">{item.title}</h1>
                <span className="date">{dayjs(item.date).format('MMM DD, YYYY')}</span>
              </div>
            </Link>
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
