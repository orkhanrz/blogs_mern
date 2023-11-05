import React, { useState, useEffect } from "react";
import "./Notifier.css";

const Notifier = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`notifier ${type === "success" ? "success" : "fail"} ${
        show ? "active" : "hide"
      }`}
    >
      <p className="notifierMsg">{message}</p>
    </div>
  );
};

export default Notifier;
