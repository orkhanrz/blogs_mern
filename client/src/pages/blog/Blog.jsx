import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Blog.css";
import dayjs from "dayjs";
import parse from "html-react-parser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Aside from "../../components/aside/Aside";
import SignMeUp from "../../components/signMeUp/SignMeUp";
import Author from "../../components/author/Author";
import Comment from "../../components/comment/Comment";
import Loader from "../../components/loader/Loader";
import Error from "../error/Error";
import { userContext } from "../../context/UserContext";
import { blogsContext } from "../../context/BlogsContext";

function Blog() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useContext(userContext);
  const { reloadBlogs } = useContext(blogsContext);
  const { data, isLoading, error } = useFetch("/api" + pathname);
  const [form, setForm] = useState({ message: "" });
  const [formError, setFormError] = useState({ message: null });
  const [liked, setLiked] = useState({ state: false, count: 0 });
  const [comments, setComments] = useState([]);

  const likePost = () => {
    if (!user) {
      return navigate("/signin");
    }

    fetch(`/api/blogs/${data._id}/likes/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLiked((prevState) => ({
            ...prevState,
            count: prevState.state ? prevState.count - 1 : prevState.count + 1,
            state: !prevState.state,
          }));

          reloadBlogs();
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (commentId) => {
    fetch(`/api/blogs/${data._id}/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments((prevState) => {
            return prevState.filter((comment) => comment._id !== commentId);
          });
          reloadBlogs();
        }
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      return navigate("/signin");
    }

    fetch(`/api/blogs/${data._id}/comments`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let comment = data.comment;
          setForm({ message: "" });
          setFormError({ message: null });
          setComments((prevState) => [...prevState, comment]);
          reloadBlogs();
        } else {
          setFormError({ message: data.message });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLiked({
      state: data?.likes.users.includes(user?._id),
      count: data?.likes.count,
    });
    setComments(data?.comments);
  }, [data]);

  return !error ? (
    <>
      <Header />
      <div className="singleBlogPage">
        <div className="singleBlogPageContainer">
          <div className="singleBlogPageContent">
            {!isLoading ? (
              <div className="singleBlogMain">
                <div className="singleBlogPost">
                  <div className="singleBlogPostHeader">
                    <p className="singleBlogPostCategory">{data.category}</p>
                    <h1 className="singleBlogPostTitle">{data.title}</h1>
                    <span className="singleBlogPostDate">
                      {dayjs(data.date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <div className="singleBlogPostImage">
                    <img src={data.image} alt="" />
                  </div>
                  <div className="singleBlogPostMain">
                    <h2 className="singleBlogPostSubtitle">{data.subtitle}</h2>
                    <p className="singleBlogPostText">{parse(data.text)}</p>
                  </div>
                </div>
                <div className="singleBlogPostKeywords">
                  {data.keywords.split(",").map((keyword, i) => {
                    return <span key={i}>{keyword}</span>;
                  })}
                </div>
                <div className="singleBlogPostDetails">
                  <div className="singleBlogPostDetailsMain">
                    <span>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`heartIcon ${liked.state ? "liked" : ""}`}
                        onClick={likePost}
                      />
                      {liked.count} likes
                    </span>
                    <span>{data.length} mins read</span>
                    <span>{data.views} views</span>
                  </div>
                  <div className="singleBlogPostDetailsSocial">
                    <span>
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="facebookIcon"
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="twitterIcon"
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faPinterest}
                        className="pinterestIcon"
                      />
                    </span>
                  </div>
                </div>
                <SignMeUp />
                <Author author={data.author} />
                {comments?.length ? (
                  <div className="comments">
                    <h1 className="commentsTitle">Comments</h1>
                    {comments?.map((comment) => {
                      return (
                        <Comment
                          comment={{ ...comment, _id: comment._id }}
                          key={comment._id}
                          deleteComment={deleteComment}
                        />
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <div className="blogPageFormWrapper">
                  <form className="messageForm">
                    <textarea
                      name="message"
                      placeholder="Add a Comment"
                      value={form.message}
                      onChange={(e) =>
                        setForm((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    ></textarea>
                    {formError.message ? (
                      <p className="formError">{formError.message}</p>
                    ) : (
                      ""
                    )}
                    <button onClick={submitHandler}>Post comment</button>
                  </form>
                </div>
              </div>
            ) : (
              <Loader />
            )}
            <Aside />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Error message={error} status={505} />
  );
}

export default Blog;
