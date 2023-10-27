import React from "react";
import "./Blogs.css";
import useFetch from "../../hooks/useFetch";

import Header from "../../components/header/Header";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import Error from "../error/Error";

function Blogs() {
  const { data, isLoading, error } = useFetch("/blogs");
  const pages = data?.blogs.length / 9;

  return !error ? (
    <>
      <Header />
      <div className="blogsPage">
        {!isLoading ? (
          <>
            <div className="blogsContainer">
              <div className="blogs column">
                {data.blogs.length
                  ? data.blogs.map((item) => {
                      return <Blog item={item} key={item._id} />;
                    })
                  : null}
              </div>
              {pages > 1 ? <Pagination pages={pages} /> : null}
            </div>
            <Aside />
          </>
        ) : null}
      </div>
      <Footer />
    </>
  ) : <Error status={505} message="Something went wrong, please try again later :/"/>;
}

export default Blogs;
