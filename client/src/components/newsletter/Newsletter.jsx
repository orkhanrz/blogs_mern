import React from "react";
import "./Newsletter.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

function Newsletter() {
  return (
    <div className="newsLetter">
      <span className="newsLetterLogo">
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <h1 className="newsLetterTitle">Newsletter</h1>
      <p className="newsLetterText">
        Get the latest fashion trends, the best in travel and my life.
      </p>
      <div className="newsLetterInputWrapper">
        <FontAwesomeIcon icon={faEnvelope} className="newsLetterInputIcon"/>
        <input type="text" placeholder="Enter Your Email"/>
      </div>
      <button>sign me up!</button>
    </div>
  );
}

export default Newsletter;
