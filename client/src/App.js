import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
import { BlogsContextProvider } from "./context/BlogsContext";
import Protected from "./components/protected/Protected";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blogs from "./pages/blogs/Blogs";
import AddBlog from "./pages/addBlog/AddBlog";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import Error from "./pages/error/Error";

function App() {
  return (
    <UserContextProvider>
      <BlogsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/blogs/add"
              element={
                <Protected>
                  <AddBlog />
                </Protected>
              }
            />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="*"
              element={<Error message="Page not found :/" status={404} />}
            />
          </Routes>
        </BrowserRouter>
      </BlogsContextProvider>
    </UserContextProvider>
  );
}

export default App;
