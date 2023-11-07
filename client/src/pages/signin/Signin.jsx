import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Notifier from '../../components/notifier/Notifier';
import { userContext } from "../../context/UserContext";

function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null });
  const [notification, setNotification] = useState(null);
  const { user, login } = useContext(userContext);
  const navigate = useNavigate();
  const submitBtn = useRef();

  useEffect(() => {
    if (user){
      navigate('/');
    };
  }, []);

  function showNotification(message, type){
    setNotification({message, type});

    setTimeout(() => {
      setNotification(null);

      if(type === 'success'){
        navigate(-1);
      };
    }, 3000);
  };

  function handleSubmit(e) {
    submitBtn.current.disabled = true;
    e.preventDefault();

    fetch("/api/users/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showNotification(data.message, 'success');
          login(data.user);
        } else {
          submitBtn.current.disabled = false;
          setErrors(data.errors);
        }
      })
      .catch((err) => {
        submitBtn.current.disabled = false;
        showNotification(err.message, 'fail')
      });
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
                <button ref={submitBtn}>Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {notification ? <Notifier message={notification.message} type={notification.type}/> : ""}
      <Footer />
    </>
  );
}

export default Auth;
