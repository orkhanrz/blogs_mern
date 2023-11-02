import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { userContext } from "../../context/UserContext";

function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null });
  const { user, login } = useContext(userContext);
  const navigate = useNavigate();

  if (user){
    navigate('/');
  };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          login(data.user);
          navigate(-1);
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
        <div className="authPageBlur"></div>
        <div className="authPageContainer">
          <div className="authFormContainer">
            <div className="authFormImage">
              <img src="/images/form-bird.png" alt="" />
              <div className="authImageTextWrapper">
                <h1 className="authImageTitle">Maecenas mattis egestas</h1>
                <p className="authImageText">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, accusamus!
                </p>
              </div>
            </div>
            <div className="authFormWrapper">
              <form autoComplete="off" onSubmit={handleSubmit} className="authForm">
                <h1 className="authFormTitle">Blogs</h1>
                <h2 className="authFormSubtitle">Welcome to Blogs</h2>
                <div className="formControl">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" onChange={(e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}/>
                  {errors.email ? <p className="formError">{errors.email}</p> : null}
                </div>
                <div className="formControl">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" onChange={(e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))}/>
                  {errors.password ? <p className="formError">{errors.password}</p> : null}
                </div>
                <div className="formControl">
                  <p className="account">Don't have an account? Please <Link to="/signup">sign up</Link>!</p>
                </div>
                <button>Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Auth;
