import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../header/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faBurger } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userControls, setUserControls] = useState(false);
  const [mobileHeader, setMobileHeader] = useState(false);
  const { user, logout } = useContext(userContext);

  const openUserControls = () => {
    setUserControls((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      fetch("/users/token", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            logout();
            navigate("/signin");
          }
        });
    }
  }, []);

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
                {user ? (
                  <div className="userControlsOptions">
                    <Link to="/profile" className="userControlsBtn">
                      Edit Profile
                    </Link>
                    <Link to="/blogs/add" className="userControlsBtn">
                      Add blog
                    </Link>
                    <button className="userControlsBtn" onClick={logout}>
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="userControlsOptions">
                    <Link
                      to="/signin"
                      className="userControlsBtn"
                      onClick={() => setUserControls(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="userControlsBtn"
                      onClick={() => setUserControls(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <span
            className={`toggleMenu ${mobileHeader ? "active" : ""}`}
            onClick={() => setMobileHeader((prevState) => !prevState)}
          >
            <FontAwesomeIcon icon={faBurger} />
          </span>
          <div className={`mobileHeader ${mobileHeader ? "active" : ""}`}>
            <ul className="mobileHeaderList">
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
                  className={`headerLink ${pathname === "/about" && "active"}`}
                >
                  Contact
                </Link>
              </li>
              {user ? (
                <>
                  <Link to="/profile" className="headerLink">
                    Edit Profile
                  </Link>
                  <Link to="/blogs/add" className="headerLink">
                    Add blog
                  </Link>
                  <button className="headerLink" onClick={logout}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className={`headerLink ${
                      pathname === "/signin" && "active"
                    }`}
                  >
                    Signin
                  </Link>
                </>
              )}
            </ul>
            <div className="mobileHeaderIcons">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
