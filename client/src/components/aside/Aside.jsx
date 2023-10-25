import React from "react";
import "./Aside.css";

import Newsletter from "../newsletter/Newsletter";
import User from "../user/User";

function Aside() {
  return (
    <div className="aside">
      <User />
      <Newsletter />
    </div>
  );
}

export default Aside;
