import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../header/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { pathname } = useLocation();
  const [userControls, setUserControls] = useState(false);

  const openUserControls = () => {
    console.log(userControls);
    setUserControls((prevState) => !prevState);
  };

  return (
    <header>
      <div className="headerContainer">
        <div className="headerContent">
          <h1 className="headerLogo">
            <Link to="/">Blogs</Link>
          </h1>
          <ul className="headerList">
            <li>
              <Link
                to="/"
                className={`headerLink ${pathname === "/" && "active"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`headerLink ${pathname === "/blogs" && "active"}`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`headerLink ${pathname === "/about" && "active"}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`headerLink ${pathname === "/contact" && "active"}`}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="headerIcons">
            <div className="headerSocial">
              <span>
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="headerSocialItem"
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="headerSocialItem"
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faPinterest}
                  className="headerSocialItem"
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="headerSocialItem"
                />
              </span>
            </div>
            <div className="headerUser">
              <FontAwesomeIcon
                icon={faUser}
                className="headerSocialItem"
                onClick={openUserControls}
              />
              <div className={`userControls ${userControls ? "active" : ""}`}>
                <div className="userControlsOptions">
                  <Link to='/signin' className="userControlsBtn">Sign in</Link>
                  <Link to='/signup' className="userControlsBtn">Sign up</Link>
                </div>
                {/* <div className="userControlsOptions">
                  <button className="userControlsBtn">Edit Profile</button>
                  <button className="userControlsBtn">Add blog</button>
                  <button className="userControlsBtn">Sign out</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
