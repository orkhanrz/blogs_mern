import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { blogsContext } from "../../context/BlogsContext";
import "./AddBlog.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Notifier from "../../components/notifier/Notifier";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddBlog({ mode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [form, setForm] = useState({ title: "", subtitle: "", category: "", text: "", keywords: "", length: "", image: ""});
  const [errors, setErrors] = useState({ title: "", category: "", text: "", keywords: "", length: "", image: "" });
  const [notification, setNotification] = useState(null);
  const { reloadBlogs } = useContext(blogsContext);
  const submitBtn = useRef();

  function displayNotification(message, type) {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);

      if (type === 'success'){
        navigate("/blogs");
      }
    }, 3000);
  }

  useEffect(() => {
    if (mode === "edit") {
      const blogId = pathname.split("/")[3];

      fetch("/blogs/" + blogId)
        .then((res) => res.json())
        .then((data) => {
          setForm({ title: data.title, subtitle: data.subtitle, category: data.category, text: data.text, keywords: data.keywords, length: data.length, image: data.image });
        });
    } else {
      setForm({ title: "", subtitle: "", category: "", text: "", keywords: "", length: "", image: "" });
    }
  }, []);

  function handleChange(e) {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //Disable submit button
    submitBtn.current.disabled = true;
    
    const options = {
      url: mode === "add" ? "/blogs" : `/blogs/${pathname.split("/")[3]}`,
      method: mode === "add" ? "POST" : "PATCH"
    }

    const formData = new FormData();

    for (let key of Object.keys(form)) {
      formData.append(key, form[key]);
    }

    fetch(options.url, { method: options.method, body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          displayNotification(data.message, "success");
          reloadBlogs();
        } else {
          submitBtn.current.disabled = false;
          if (data.errors) {
            setErrors(data.errors);
          } else {

            setErrors({
              title: "",
              subtitle: "",
              category: "",
              text: "",
              keywords: "",
              length: "",
              image: "",
            });
            displayNotification(data.message, "fail");
          }
        }
      })
      .catch((err) => {
        displayNotification(err.message, "fail");
      });
  }

  return (
    <>
      <Header />
      <div className="addBlogPage">
        <div className="addBlogPageContainer">
          <form autoComplete="off" className="customForm">
            <div className="formControl">
              <input
                value={form.title}
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
              />
              {errors.title ? <p className="formError">{errors.title}</p> : ""}
            </div>
            <div className="formControl">
              <input
                value={form.subtitle}
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
            </div>
            <div className="formControl">
              <input
                value={form.category}
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
            </div>
            <div className="formControl">
              <input
                value={form.keywords}
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
            </div>
            <div className="formControl">
              <input
                value={form.length}
                type="text"
                name="length"
                placeholder="Length (minutes)"
                onChange={handleChange}
              />
              {errors.length ? (
                <p className="formError">{errors.length}</p>
              ) : (
                ""
              )}
            </div>
            <div className="formControl">
              <input
                value=""
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
            </div>
            <div className="formControl">
              <CKEditor
                data={form.text}
                editor={ClassicEditor}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  setForm((prevState) => ({ ...prevState, text: data }));
                }}
              />
              {errors.text ? <p className="formError">{errors.text}</p> : ""}
            </div>
            <button ref={submitBtn} onClick={handleSubmit}>{mode === 'add' ? 'Add blog' : 'Edit blog'}</button>
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

export default AddBlog;
