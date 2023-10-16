import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="footerContent">
        <span className="footerContentItem">
          <FontAwesomeIcon icon={faFacebook} className="footerContentItemLogo"/>
          Facebook
        </span>
        <span className="footerContentItem">
          <FontAwesomeIcon icon={faTwitter} className="footerContentItemLogo"/>
          Twitter
        </span>
        <span className="footerContentItem">
          <FontAwesomeIcon icon={faPinterest} className="footerContentItemLogo"/>
          Pinterest
        </span>
        <span className="footerContentItem">
          <FontAwesomeIcon icon={faInstagram} className="footerContentItemLogo"/>
          Instagram
        </span>
      </div>
      <div className="footerLogo">
        Blogs
      </div>
    </footer>
  );
}

export default Footer;
