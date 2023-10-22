import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import Blog from './pages/blog/Blog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<h1>Signin</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
