import React, { useState, useEffect } from "react";
import "./Home.css";

import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const [featured, setFeatured] = useState([
    {
      _id: 1,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/nynne-schroder-684315-unsplash-570x410.jpg",
      title: "Cream Blue Denim",
      date: "Nov 5, 2018",
    },
    {
      _id: 2,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/nynne-schroder-684315-unsplash-570x410.jpg",
      title: "Cream Blue Denim",
      date: "Nov 5, 2018",
    },
    {
      _id: 3,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/nynne-schroder-684315-unsplash-570x410.jpg",
      title: "Cream Blue Denim",
      date: "Nov 5, 2018",
    },
    {
      _id: 4,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/nynne-schroder-684315-unsplash-570x410.jpg",
      title: "Cream Blue Denim",
      date: "Nov 5, 2018",
    },
  ]);

  const [blogs, setBlogs] = useState([
    {
      _id: 1,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2017/06/content-pixie-PWBQGACj39w-unsplash-570x410.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You've gotta dance like there's nobody watching, love like you'll
      never be hurt, sing like there's nobody listening...`,
      likes: 56,
      length: 2,
      views: 1324,
      date: "13 JUN",
    },
    {
      _id: 2,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/jonathan-borba-JnO2Es7ct6Y-unsplash-570x410.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You've gotta dance like there's nobody watching, love like you'll
      never be hurt, sing like there's nobody listening...`,
      likes: 56,
      length: 2,
      views: 1324,
      date: "13 JUN",
    },
    {
      _id: 3,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/nynne-schroder-687478-unsplash-570x410.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You've gotta dance like there's nobody watching, love like you'll
      never be hurt, sing like there's nobody listening...`,
      likes: 56,
      length: 2,
      views: 1324,
      date: "13 JUN",
    },
    {
      _id: 4,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/daria-shevtsova-beautiful-beauty-casual-709789-570x410.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You've gotta dance like there's nobody watching, love like you'll
      never be hurt, sing like there's nobody listening...`,
      likes: 56,
      length: 2,
      views: 1324,
      date: "13 JUN",
    },
    {
      _id: 5,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2018/11/jonathan-borba-epBh_ogRXiU-unsplash-scaled-e1592832957504-1170x730.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You've gotta dance like there's nobody watching, love like you'll
      never be hurt, sing like there's nobody listening...`,
      likes: 56,
      length: 2,
      views: 1324,
      date: "13 JUN",
    },
  ]);

  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPages(blogs.length / 9);
  }, [blogs]);

  return (
    <>
      <Header />
      <div className="homeContainer">
        <div className="homeContent">
          <Banner featured={featured} />
          <div className="homePage">
            <div className="blogsContainer">
              {blogs.length && (
                <div className="homeBlogs">
                  {blogs.map((blog) => {
                    return <Blog item={blog} key={blog._id} />;
                  })}
                </div>
              )}
              <Pagination />
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
