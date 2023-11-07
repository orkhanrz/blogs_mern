import { useState, useContext, useEffect, useRef } from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Notifier from "../../components/notifier/Notifier";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";

function Auth() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", fullname: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    fullname: null,
  });
  const { login, user } = useContext(userContext);
  const [notification, setNotification] = useState(null);
  const submitBtn = useRef();

  function showNotification(message, type){
    setNotification({message, type});

    setTimeout(() => {
      setNotification(null);

      if(type === 'success'){
        navigate(-1);
      };
    }, 3000);
  }

  useEffect(() => {
    if (user){
      navigate('/');
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    submitBtn.current.disabled = true;

    fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          submitBtn.current.disabled = false;
          return setErrors(data.errors);
        } else {
          setErrors({ email: null, password: null, fullname: null });
          login(data.user);
          navigate("/signin");
        }
      })
      .catch((err) => {
        submitBtn.current.disabled = false;
        showNotification(err.message, 'fail');
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Totam facere architecto expedita ea porro laudantium minima
                  reiciendis est quibusdam necessitatibus.
                </p>
              </div>
            </div>
            <div className="authFormWrapper">
            <form autoComplete="off" className="authForm" onSubmit={handleSubmit}>
              <h1 className="authFormTitle">Blogs</h1>
              <h2 className="authFormSubtitle">Welcome to Blogs</h2>
              <div className="formControl">
              <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" id="fullname" onChange={(e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value, })) } />
                {errors.fullname ? ( <p className="formError">{errors.fullname}</p> ) : null}
              </div>
              <div className="formControl">
              <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value, })) } />
                {errors.email ? ( <p className="formError">{errors.email}</p> ) : null}
              </div>
              <div className="formControl">
              <label htmlFor="password">Password</label>
                <input type="password" id='password' name="password" onChange={(e) => setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value, })) } />
                {errors.password ? ( <p className="formError">{errors.password}</p> ) : null}
              </div>
              <div className="formControl">
                <p className="account">Have an account? Please <Link to="/signin">sign in</Link>!</p>
              </div>
              <button ref={submitBtn}>Sign up</button>
            </form>
            </div>
          </div>
        </div>
      </div>
      {notification ? <Notifier type={notification.type} message={notification.message}/> : ''}
      <Footer />
    </>
  );
}

export default Auth;
