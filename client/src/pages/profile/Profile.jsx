import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Notifier from "../../components/notifier/Notifier";
import { userContext } from "../../context/UserContext";

function Profile() {
  const navigate = useNavigate();
  const { user, edit } = useContext(userContext);
  const [form, setForm] = useState({
    fullname: user.fullname,
    quote: user.quote,
    image: "",
  });
  const [notification, setNotification] = useState(null);
  const submitBtn = useRef();

  function showNotification(message, type) {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(false);

      if (type === "success") {
        navigate("/");
      }
    }, 3000);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("quote", form.quote);
    formData.append("image", form.image);

    fetch(`/users/${user._id}`, { method: "PUT", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          submitBtn.current.disabled = true;
          edit(data.user);
          showNotification(data.message, "success");
        } else {
          showNotification(data.message, "fail");
        }
      })
      .catch((err) => showNotification(err.message, "fail"));
  }

  return (
    <>
      <Header />
      <div className="profilePage">
        <div className="profileContainer">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="customForm"
          >
            <div className="formControl">
              <input
                type="text"
                name="fullname"
                placeholder="fullname"
                value={form.fullname}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="formControl">
              <input
                type="text"
                name="quote"
                placeholder="Quote"
                value={form.quote}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="formControl">
              <input
                type="file"
                name="image"
                placeholder="Image"
                value=""
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.files[0],
                  }));
                }}
              />
            </div>
            <button ref={submitBtn}>Update</button>
          </form>
        </div>
        {notification ? (
          <Notifier message={notification.message} type={notification.type} />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
