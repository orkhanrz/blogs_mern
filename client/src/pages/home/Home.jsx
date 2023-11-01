import React, { useContext } from "react";
import "./Home.css";

import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import Loader from "../../components/loader/Loader";
import Error from "../error/Error";
import { blogsContext } from "../../context/BlogsContext";

function Home() {
  const {
    blogs,
    error,
    isLoading,
    page,
    setCurrentPage,
    totalPages,
    featured,
  } = useContext(blogsContext);

  return !error ? (
    <>
      <Header />
      <div className="homePage">
        <Banner featured={featured} />
        <div className="homeContainer">
          {!isLoading ? (
            <div className="homeBlogsContainer">
              <div className="homeBlogs">
                {blogs.map((blog) => {
                  return <Blog item={blog} key={blog._id} />;
                })}
              </div>
              {totalPages > 1 ? (
                <Pagination
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  page={page}
                />
              ) : null}
            </div>
          ) : (
            <Loader />
          )}
          <Aside />
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Error
      message="Something went wrong, please try again later :/"
      status="505"
    />
  );
}

export default Home;
