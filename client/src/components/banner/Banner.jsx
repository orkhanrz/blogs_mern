import React, { useEffect, useState } from "react";
import "./Banner.css";

import Slider from "../slider/Slider";

function Banner({ featured }) {
	const [animate, setAnimate] = useState("");

	useEffect(() => {
		setTimeout(() => {
			setAnimate("animate");
		}, 0);
	}, []);

	return (
		<div className={`homeBanner ${featured.length && "loaded"}`}>
			<img
				src="https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				alt="banner"
			/>
			<p className={`bannerText ${animate}`}>hello...</p>
			{featured.length ? <Slider featured={featured} /> : null}
		</div>
	);
}

export default Banner;
