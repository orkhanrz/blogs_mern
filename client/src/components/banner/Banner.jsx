import React from 'react'
import './Banner.css';

import Slider from "../slider/Slider";

function Banner({featured}) {
  return (
    <div className="homeBanner">
    <img
      src="https://malina.artstudioworks.net/wp-content/uploads/2018/12/For_home_4.jpg"
      alt="banner"
    />
    {featured.length && <Slider featured={featured} />}
  </div>
  )
}

export default Banner