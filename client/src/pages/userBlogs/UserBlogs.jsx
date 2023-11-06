import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserBlogs.css";
import { userContext } from "../../context/UserContext";
import { blogsContext } from "../../context/BlogsContext";
import useFetch from "../../hooks/useFetch";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Aside from "../../components/aside/Aside";
import Loader from "../../components/loader/Loader";
import Notifier from "../../components/notifier/Notifier";
import Error from "../../pages/error/Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function UserBlogs() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { reloadBlogs } = useContext(blogsContext);
  const [notification, setNotification] = useState(null);
  const { data, isLoading, error, refetch } = useFetch(
    `/users/${user._id}/blogs`
  );

  function displayNotification(message, type) {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function deleteBlogHandler(id) {
    fetch(`/blogs/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        displayNotification(data.message, data.success ? "success" : "fail");
        reloadBlogs();
        refetch();
      })
      .catch((err) => {
        displayNotification(err.message, "fail");
      });
  }

  return !error ? (
    <>
      <Header />
      <div className="userBlogsPage">
        <div className="userBlogsContainer">
          {!isLoading ? (
            <div className="userBlogsTableContainer">
              <table className="userBlogsTable">
                <thead>
                  <tr>
                    <th className="orderCol">Order</th>
                    <th>Title</th>
                    <th className="mobileTableCol">Subtitle</th>
                    <th>Category</th>
                    <th className="mobileTableCol">Likes</th>
                    <th className="mobileTableCol">Views</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="tableBody">
                  {data?.map((blog, i) => {
                    return (
                      <tr key={blog._id}>
                        <td className="orderCol">{i + 1}</td>
                        <td className="tableLongText">{blog.title}</td>
                        <td className="tableLongText mobileTableCol">
                          {blog.subtitle}
                        </td>
                        <td>{blog.category}</td>
                        <td className="mobileTableCol">{blog.likes.count}</td>
                        <td className="mobileTableCol">{blog.views}</td>
                        <td>
                          <span
                            className="tableActionBtn editBlogBtn"
                            onClick={() => navigate(`/blogs/edit/${blog._id}`)}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                          </span>
                        </td>
                        <td>
                          <span
                            className="tableActionBtn deleteBlogBtn"
                            onClick={() => deleteBlogHandler(blog._id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Loader />
          )}
          <Aside />
        </div>
        {notification ? (
          <Notifier message={notification.message} type={notification.type} />
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  ) : (
    <Error
      message="Something went wrong, please try again later :/"
      status={505}
    />
  );
}

export default UserBlogs;
