import React from "react";
import './Author.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Author({author}) {
  return (
    <div className="aboutAuthor">
      <div className="aboutAuthorImage">
        <img
          src={author.image}
          alt=""
        />
      </div>
      <div className="aboutAuthorDetails">
        <h1 className="aboutAuthorTitle">{author.fullname}</h1>
        <p className="aboutAuthorText">
          {author.quote}
        </p>
        <div className="aboutAuthorSocial">
          <span>
            <FontAwesomeIcon icon={faFacebook} />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
          <span>
            <FontAwesomeIcon icon={faInstagram} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Author;
