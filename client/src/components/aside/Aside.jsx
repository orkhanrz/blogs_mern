import React from "react";
import "./Aside.css";
import Newsletter from "../newsletter/Newsletter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTwitter,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Aside() {
  return (
    <div className="aside">
      <div className="about">
        <h1 className="aboutTitle">About me</h1>
        <div className="aboutImage">
          <img
            src="https://malina.artstudioworks.net/wp-content/uploads/2018/12/For_home_4-160x160.jpg"
            alt=""
          />
        </div>
        <div className="aboutDetails">
          <p className="aboutText">
            Love like you'll never be hurt, Sing like there's nobody listening.
          </p>
          <span className="aboutFullname">Sophie James</span>
        </div>
        <div className="aboutSocial">
          <span>
            <FontAwesomeIcon icon={faFacebook} className="aboutSocialItem" />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitter} className="aboutSocialItem" />
          </span>
          <span>
            <FontAwesomeIcon icon={faPinterest} className="aboutSocialItem" />
          </span>
          <span>
            <FontAwesomeIcon
              icon={faSquareInstagram}
              className="aboutSocialItem"
            />
          </span>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export default Aside;
