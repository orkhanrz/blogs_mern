import React, { useEffect, useState } from "react";
import "./Form.css";

function Form({ type, url }) {
  const [details, setDetails] = useState({
    name: "",
    email: "",
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

    console.log(details);
  };

  return (
    <div className="contactPageFormWrapper">
      <form className="contactPageForm">
        <input
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
        />
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
