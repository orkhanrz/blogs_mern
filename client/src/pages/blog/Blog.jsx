import React from "react";
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

function Blog() {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <div className="singleBlogPage">
        <div className="singleBlogMain">
          <div className="singleBlogPost">
            <div className="singleBlogPostHeader">
              <p className="singleBlogPostCategory">{state.category}</p>
              <h1 className="singleBlogPostTitle">{state.title}</h1>
              <span className="singleBlogPostDate">
                {dayjs(state.date).format("MMM DD, YYYY")}
              </span>
            </div>
            <div className="singleBlogPostImage">
              <img src={state.image} alt="" />
            </div>
            <div className="singleBlogPostMain">
              <h2 className="singleBlogPostSubtitle">{state.subtitle}</h2>
              <p className="singleBlogPostText">{state.text}</p>
            </div>
          </div>
          <div className="singleBlogPostKeywords">
            {state.keywords.split(",").map((keyword) => {
              return <span>{keyword}</span>;
            })}
          </div>
          <div className="singleBlogPostDetails">
            <div className="singleBlogPostDetailsMain">
              <span>
                <FontAwesomeIcon icon={faHeart} className="heartIcon" />{" "}
                {state.likes} likes
              </span>
              <span>{state.length} mins read</span>
              <span>{state.views} views</span>
            </div>
            <div className="singleBlogPostDetailsSocial">
              <span>
                <FontAwesomeIcon icon={faFacebook} className="facebookIcon" />
              </span>
              <span>
                <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
              </span>
              <span>
                <FontAwesomeIcon icon={faPinterest} className="pinterestIcon" />
              </span>
            </div>
          </div>
          <SignMeUp />
          <Author author={state.author} />
          <div className="comments">
            <h1 className="commentsTitle">Comments</h1>
            <Comment />
            <Comment />
            <Comment />
          </div>
          <Form type="comment" />
        </div>
        <Aside />
      </div>
      <Footer />
    </>
  );
}

export default Blog;
