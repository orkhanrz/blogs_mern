import React, { useContext } from "react";
import "./User.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faTwitter,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { userContext } from "../../context/UserContext";

function User() {
  const { user } = useContext(userContext);

  return user ? (
    <div className="about">
      <h1 className="aboutTitle">About me</h1>
      <div className="aboutImage">
        <img
          src={user.image}
          alt="user photo"
        />
      </div>
      <div className="aboutDetails">
        <p className="aboutText">
          {user.quote}
        </p>
        <span className="aboutFullname">{user.fullname}</span>
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
  ) : null;
}

export default User;
