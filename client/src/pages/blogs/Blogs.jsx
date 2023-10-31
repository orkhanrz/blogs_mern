import React, { useContext } from "react";
import "./Blogs.css";

import Header from "../../components/header/Header";
import Blog from "../../components/blog/Blog";
import Aside from "../../components/aside/Aside";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import Error from "../error/Error";
import Loader from "../../components/loader/Loader";
import { blogsContext } from "../../context/BlogsContext";

function Blogs() {
  const { blogs, isLoading, error, setCurrentPage, totalPages, page } =
    useContext(blogsContext);

  return !error ? (
    <>
      <Header />
      <div className="blogsPage">
        {!isLoading ? (
          <div className="blogsPageContainer">
            <div className="blogs column">
              {blogs.length
                ? blogs.map((item) => {
                    return <Blog item={item} key={item._id} />;
                  })
                : null}
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
      <Footer />
    </>
  ) : (
    <Error
      status={505}
      message="Something went wrong, please try again later :/"
    />
  );
}

export default Blogs;
