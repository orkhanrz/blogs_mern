import React, {useState} from "react";

function Form() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeHandler = (e) => {
    setContactDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(contactDetails);
  };

  return (
    <div className="contactPageFormWrapper">
      <form className="contactPageForm">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contactDetails.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={contactDetails.email}
          onChange={changeHandler}
        />
        <textarea
          name="message"
          placeholder="Add message"
          value={contactDetails.message}
          onChange={changeHandler}
        ></textarea>
        <button onClick={submitHandler}>Send message</button>
      </form>
    </div>
  );
}

export default Form;
