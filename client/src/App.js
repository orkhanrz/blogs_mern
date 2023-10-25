import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
