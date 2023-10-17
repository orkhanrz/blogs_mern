import React, { useEffect, useState } from "react";
import "./Blogs.css";

import Header from "../../components/header/Header";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";

function Blogs() {
  const [blogs, setBlogs] = useState([
    {
      _id: 1,
      img: "https://malina.artstudioworks.net/wp-content/uploads/2017/06/content-pixie-PWBQGACj39w-unsplash-570x410.jpg",
      category: "Fashion",
      title: "Scandinavian",
      description: `You’ve gotta dance like there’s nobody watching, Love like you’ll never be hurt, sing like there’s nobody listening, and live like it’s heaven on earth. Only once in your life, I truly believe, you find someone who can completely turn your world around. You tell them things that you’ve never shared with another soul and`,
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
    {
      _id: 6,
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
    {
      _id: 7,
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
    {
      _id: 8,
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
    {
      _id: 9,
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
    {
      _id: 10,
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
      <div className="blogsPage">
        <div className="blogsContainer">
          <div className="blogs column">
            {blogs.length &&
              blogs.map((item) => {
                return <Blog item={item} key={item._id} />;
              })}
          </div>
          {pages && <Pagination />}
        </div>
        <Aside />
      </div>
      <Footer />
    </>
  );
}

export default Blogs;
