import React from "react";
import "./Popup.css";

function Popup(type, text) {
  return <div className={`popup ${type}`}>
    <div className='popupContainer'>
      <p>text</p>
    </div>
  </div>;
}

export default Popup;
