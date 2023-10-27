import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.css";

import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import Error from "../error/Error";

function Home() {
  const { data, isLoading, error } = useFetch("/blogs");
  const featured = data?.blogs.filter((item) => item.featured);
  const pages = data?.blogs.length / 9;

  return !error ? (
    <>
      <Header />
      <div className="homeContainer">
        <div className="homeContent">
          {!isLoading ? (
            <>
              <Banner featured={featured} />
              <div className="homePage">
                <div className="blogsContainer">
                  {data.blogs.length ? (
                    <div className="homeBlogs">
                      {data.blogs.map((blog) => {
                        return <Blog item={blog} key={blog._id} />;
                      })}
                    </div>
                  ) : null}
                  {pages > 1 ? <Pagination pages={pages} /> : null}
                </div>
                <Aside />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Error message='Something went wrong, please try again later :/' status='505'/>
  );
}

export default Home;
