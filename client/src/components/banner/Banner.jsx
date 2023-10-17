import React, {useEffect, useState} from 'react'
import './Banner.css';

import Slider from "../slider/Slider";

function Banner({featured}) {
  const [animate, setAnimate] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setAnimate('animate');
    }, 0);
  }, []);

  return (
    <div className='homeBanner'>
    <img
      src="https://malina.artstudioworks.net/wp-content/uploads/2018/12/For_home_4.jpg"
      alt="banner"
    />
    <p className={`bannerText ${animate}`}>hello...</p>
    {featured.length && <Slider featured={featured} />}
  </div>
  )
}

export default Banner