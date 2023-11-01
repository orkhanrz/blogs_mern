import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { userContext } from "../../context/UserContext";

function Profile() {
  const navigate = useNavigate();
  const { user, edit } = useContext(userContext);
  const [form, setForm] = useState({
    fullname: user.fullname,
    quote: user.quote,
    image: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("quote", form.quote);
    formData.append("image", form.image);

    fetch(`/api/users/${user._id}`, { method: "PUT", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          edit(data.user);
          navigate("/");
        }
      });
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
            <button>Update</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
