import React, { useState, useEffect } from "react";
import "./Home.css";

import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch("/blogs")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data.blogs;
        const featuredBlogs = blogs.filter((item) => !item.featured);

        setBlogs(blogs);
        setFeatured(featuredBlogs);
        setPages(blogs.length / 9);
      })
      .catch((err) => {
        setBlogs([]);
        setFeatured([]);
        setPages([]);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="homeContainer">
        <div className="homeContent">
          <Banner featured={featured} />
          <div className="homePage">
            <div className="blogsContainer">
              {blogs.length ? (
                <div className="homeBlogs">
                  {blogs.map((blog) => {
                    return <Blog item={blog} key={blog._id} />;
                  })}
                </div>
              ) : null}
              {pages > 1 ? <Pagination pages={pages} /> : null}
            </div>
            <Aside />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
