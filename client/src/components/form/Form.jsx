import React, { useState } from "react";
import "./Form.css";

function Form({ type, url }) {
  const [details, setDetails] = useState({
    message: "",
  });

  const changeHandler = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      body: JSON.stringify(details),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contactPageFormWrapper">
      <form className="contactPageForm">
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          value={details.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={details.email}
          onChange={changeHandler}
        /> */}
        <textarea
          name="message"
          placeholder={`Add ${type}`}
          value={details.message}
          onChange={changeHandler}
        ></textarea>
        <button onClick={submitHandler}>
          {type === "message" ? "Send message" : "Post comment"}
        </button>
      </form>
    </div>
  );
}

export default Form;
