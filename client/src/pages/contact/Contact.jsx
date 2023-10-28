import React, { useState } from "react";
import "./Contact.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeHandler = (e) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("/contact", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <div className="contactPage">
        <div className="contactPageImage">
          <img
            src="https://malina.artstudioworks.net/wp-content/uploads/2018/11/cassidy-kelley-140787-unsplash-1900x650.jpg"
            alt=""
          />
        </div>
        <div className="contactPageMain">
          <div className="contactPageMainWrapper">
            <div className="contactPageMainInfo">
              <h1 className="contactPageMainInfoTitle">
                Let's start a conversation
              </h1>
              <p className="contactPageMainInfoText">
                Afringilla tempus lectus. Sed turpis magna, convallis non
                rhoncus sed, porttitor eu neque. Vestibulu sed euismod mauris,
                ultrices tempor ex. Quisque non pulvinar felis, id eleifend
                erat. Duis fermentu ante lorem, et suscipit ipsum aliqsa. Cras
                venenatis, lectus non porta tincidunt, felis nisi facilmi, nec
                dictum magna mi at ligula. Nam sapien nunc, feugiat diam eget,
                lacinia rhoncus augue. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Sed quis
                felis erat dictum facilisis sed sit amet tellus. Proin faucibus
                ligula id augue fermentum semper eu ut tortor. Vestibulum
                pharetra iaculis elit sit amiverra. In hac habitasse platea
                dictumst. Nam volutpat ulorper hendrerit. Curabitur nisi magna,
                interdum sed ultricies nec, rhoncus a felis. Quisque convallis
                dui quam. Lorem ipsum dolor sit amet, co adipiscing elit. Nu a
                fringilla dapibus dui sit amet. Afringilla tempus lectus. Sed
                turpis magna, convallis non rhoncus sed, porttitor eu neque.
                Vestibulu sed euismod mauris, ultrices tempor ex. Maecenas non
                faucibus ante. Nullam vehicula, magna laoreet aliquam imperdiet,
                ex erat condimentum sem, et tincidunt sem justo eget ante.
                Curabitur eget orci metus. Mauris tempus erat eu elit vehicula,
                a consectetur leo eleifend. Vivamus nunc odio, efficitur et
                ullamcorper vitae, tincidunt eu erat. Nulla rutrum faucibus
                odio. Sed at efficitur lectus, nec iaculis tellus. Nunc
                vulputate massa eget lectus tincidunt, et euismod eros
                condimentum. Sed eget ligula sem. Maecenas commodo, risus
                accumsan pretium pharetra, eros neque pretium nulla, eget
                faucibus elit dolor vel dolor. Nulla nunc lectus, porta quis
                purus nec, sollicitudin finibus tortor. Phasellus gravida tortor
                felis, ac bibendum ipsum interdum at. Integer vitae blandit
                orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="contactPageFormWrapper">
              <form className="messageForm">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={changeHandler}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <textarea
                  name="message"
                  placeholder="Send message"
                  value={form.message}
                  onChange={changeHandler}
                ></textarea>
                <button onClick={submitHandler}>Send message</button>
              </form>
            </div>
          </div>
          <div className="contactPageAside">
            <div className="contactPageAsideLocation">
              <h1 className="contactPageAsideLocationTitle">Location</h1>
              <img
                src="https://malina.artstudioworks.net/wp-content/uploads/2018/11/map-img.png"
                alt=""
                className="contactPageAsideLocationImage"
              />
              <p className="contactPageAsideLocationText">
                Located at - <span>Chicago</span>
              </p>
            </div>
            <div className="contactPageAsideBanner">
              <img
                src="https://malina.artstudioworks.net/wp-content/uploads/2018/11/liana-mikah-698524-unsplash-570x410.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
