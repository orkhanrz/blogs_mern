import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Blog.css";
import dayjs from "dayjs";

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
import Form from "../../components/form/Form";
import Error from "../error/Error";
import useFetch from "../../hooks/useFetch";

function Blog() {
  const { state } = useLocation();
  const { data, isLoading, error } = useFetch(`/blogs/${state._id}`);

  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      {!error ? (
        !isLoading ? (
          <div className="singleBlogPage">
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
                  <p className="singleBlogPostText">{data.text}</p>
                </div>
              </div>
              <div className="singleBlogPostKeywords">
                {data.keywords.split(",").map((keyword) => {
                  return <span>{keyword}</span>;
                })}
              </div>
              <div className="singleBlogPostDetails">
                <div className="singleBlogPostDetailsMain">
                  <span>
                    <FontAwesomeIcon icon={faHeart} className="heartIcon" />{" "}
                    {data.likes} likes
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
                    <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
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
              <Author author={state.author} />
              {data.comments.length ? (
                <div className="comments">
                  <h1 className="commentsTitle">Comments</h1>
                  {data.comments.map(comment => {
                    return <Comment comment={comment}/>
                  })}
                </div>
              ) : (
                ""
              )}
              <Form type="comment" url={`/blogs/${state._id}/comment`} />
            </div>
            <Aside />
          </div>
        ) : (
          ""
        )
      ) : (
        <Error />
      )}
      <Footer />
    </>
  );
}

export default Blog;
