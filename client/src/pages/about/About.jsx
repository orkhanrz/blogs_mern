import React from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function About() {
  return (
    <>
      <Header />
      <div className="aboutPage">
        <div className="aboutPageContainer">
          <section className="aboutUsPrimary">
            <div className="aboutUsPrimaryInfo">
              <h1 className="aboutUsName">I am Sophie</h1>
              <p className="aboutUsDescription">
                Twenty years from now you will be more disappointed by the
                things that you didn’t do than by the ones you did do. Sail away
                from the safe harbor.
              </p>
              <span className="aboutUsFullname">Sophie James</span>
            </div>
            <div className="aboutUsImage">
              <img
                src="https://malina.artstudioworks.net/wp-content/uploads/elementor/thumbs/For_home_4-o0m2yzkllmh0cjhhclcla4dz35vyc35hudn5oqpt72.jpg"
                alt="about"
              />
            </div>
          </section>
          <section className="aboutMeSecondary">
            <span>Explore</span>
            <span>Dream</span>
            <span>Discover</span>
          </section>
          <section className="aboutMeQuote">
            <FontAwesomeIcon icon={faQuoteLeft} className="aboutMeQuoteIcon" />
            <p>You only live once, but if you do it right, once is enough.</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
