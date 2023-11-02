import React, { useContext, useState } from "react";
import "./UserBlogs.css";
import { userContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Aside from "../../components/aside/Aside";
import Loader from "../../components/loader/Loader";
import Notifier from '../../components/notifier/Notifier';
import Error from "../../pages/error/Error";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function UserBlogs() {
  const { user } = useContext(userContext);
  const { data, isLoading, error } = useFetch(`/api/users/${user._id}/blogs`);

  function deleteBlogHandler(id){
    fetch(`/blogs/${id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
            
        })
        .catch(err => {
            console.log(err);
        })
  };

  return !error ? (
    <>
      <Header />
      <div className="userBlogsPage">
        <div className="userBlogsContainer">
          {!isLoading ? (
            <table className="userBlogsTable">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Category</th>
                  <th>Likes</th>
                  <th>Views</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((blog, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td className="tableLongText">{blog.title}</td>
                      <td className="tableLongText">{blog.subtitle}</td>
                      <td>{blog.category}</td>
                      <td>{blog.likes.count}</td>
                      <td>{blog.views}</td>
                      <td>
                        <span className="tableActionBtn editBlogBtn" >
                          <FontAwesomeIcon icon={faPencil} />
                        </span>
                      </td>
                      <td>
                        <span className="tableActionBtn deleteBlogBtn" onClick={() => deleteBlogHandler(blog._id)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
      status={505}
    />
  );
}

export default UserBlogs;
