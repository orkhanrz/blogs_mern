import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { userContext } from "../../context/UserContext";

function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null });
  const { login } = useContext(userContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/users/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          login(data.user);
          navigate('/');
        } else {
          setErrors(data.errors);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header />
      <div className="authPage">
        <div className="authPageBackground"></div>
        <div className="authPageContainer">
          <div className="authImage">
            <img src="/images/form-bird.png" alt="" />
            <div className="authImageTextWrapper">
              <h1 className="authImageTitle">Maecenas mattis egestas</h1>
              <p className="authImageText">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
                facere architecto expedita ea porro laudantium minima reiciendis
                est quibusdam necessitatibus.
              </p>
            </div>
          </div>
          <div className="authForm">
            <h1 className="authFormTitle">Blogs</h1>
            <h2 className="authFormSubtitle">Welcome to Blogs</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {errors.email ? (
                <p className="formError">{errors.email}</p>
              ) : null}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {errors.password ? (
                <p className="formError">{errors.password}</p>
              ) : null}
              <button>Sign in</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Auth;
