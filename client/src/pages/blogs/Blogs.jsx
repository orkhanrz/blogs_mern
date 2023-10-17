import React, { useEffect, useState } from "react";
import "./Blogs.css";

import Header from "../../components/header/Header";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch("/blogs")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data.blogs;

        setBlogs(blogs);
        setPages(blogs.length / 9);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="blogsPage">
        <div className="blogsContainer">
          <div className="blogs column">
            {blogs.length &&
              blogs.map((item) => {
                return <Blog item={item} key={item._id} />;
              })}
          </div>
          {pages > 1 ? <Pagination pages={pages} /> : null}
        </div>
        <Aside />
      </div>
      <Footer />
    </>
  );
}

export default Blogs;
