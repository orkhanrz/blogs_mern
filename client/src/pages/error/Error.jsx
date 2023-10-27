import React from "react";
import "./Error.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Error({message, status}) {
  return (
    <>
      <Header />
      <div className="errorPage">
        <div className="errorContainer">
            <h1>{status}</h1>
            <p>{message}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Error;
