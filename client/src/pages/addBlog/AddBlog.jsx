import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBlog.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function AddBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    text: "",
    keywords: "",
    length: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    subtitle: null,
    category: null,
    text: null,
    keywords: null,
    length: null,
    image: null,
  });

  function handleChange(e) {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (let key of Object.keys(form)) {
      formData.append(key, form[key]);
    }

    fetch("/api/blogs", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          const errors = data.errors;
          return setErrors(errors);
        }

        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <div className="addBlogPage">
        <div className="addBlogPageContainer">
          <form autoComplete="off" className="customForm">
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />
            {errors.title ? <p className="formError">{errors.title}</p> : ""}
            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              onChange={handleChange}
            />
            {errors.subtitle ? (
              <p className="formError">{errors.subtitle}</p>
            ) : (
              ""
            )}
            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />
            {errors.category ? (
              <p className="formError">{errors.category}</p>
            ) : (
              ""
            )}
            <textarea
              name="text"
              placeholder="Text"
              onChange={handleChange}
            ></textarea>
            {errors.text ? <p className="formError">{errors.text}</p> : ""}
            <input
              type="text"
              name="keywords"
              placeholder="Keywords [sport, gym, reading]"
              onChange={handleChange}
            />
            {errors.keywords ? (
              <p className="formError">{errors.keywords}</p>
            ) : (
              ""
            )}
            <input
              type="text"
              name="length"
              placeholder="Length (minutes)"
              onChange={handleChange}
            />
            {errors.length ? <p className="formError">{errors.length}</p> : ""}
            <input
              type="file"
              name="image"
              placeholder="Image"
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  image: e.target.files[0],
                }))
              }
            />
            {errors.image ? <p className="formError">{errors.image}</p> : ""}
            <button onClick={handleSubmit}>Add blog</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddBlog;
