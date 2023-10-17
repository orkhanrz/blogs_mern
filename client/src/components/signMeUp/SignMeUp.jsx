import React from "react";
import "./SignMeUp.css";

function SignMeUp() {
  return (
    <div className="signMeUp">
      <h1 className="signMeUpTitle">More from me</h1>
      <p className="signMeUpText">My biggest life changes, latest minds, and my family life.</p>
      <div className="signMeUpInputWrapper">
        <input type="email" name="email" placeholder="Enter your email"/>
        <button>Sign me up!</button>
      </div>
    </div>
  );
}

export default SignMeUp;
