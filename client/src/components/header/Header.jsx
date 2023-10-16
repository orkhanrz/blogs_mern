import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../header/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const {pathname} = useLocation();

  return (
    <header>
      <div className="headerContainer">
        <div className="headerContent">
          <h1 className="headerLogo">
            <Link to='/'>Blogs</Link>
          </h1>
          <ul className="headerList">
            <li>
              <Link to="/" className={`headerLink ${pathname === '/' && 'active'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className={`headerLink ${pathname === '/blogs' && 'active'}`}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/about" className={`headerLink ${pathname === '/about' && 'active'}`}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`headerLink ${pathname === '/contact' && 'active'}`}>
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
            <span>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="headerSocialItem"
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
