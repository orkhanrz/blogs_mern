import React from "react";
import "../blog/Blog.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

function Blog({ item }) {
  return (
    <div className="blogItem">
      <div className="blogImage">
        <img src={item.img} alt="" />
      </div>
      <div className="blogDetails">
        <div className="blogDetailsMain">
          <span className="blogCategory">{item.category}</span>
          <h1 className="blogTitle">{item.title}</h1>
          <p className="blogDescription">{item.description}</p>
        </div>
        <div className="blogDetailsExtra">
          <div className="blogDetailsExtraLeft">
            <span className="blogDetailsExtraItem">
              <FontAwesomeIcon icon={faHeart} className="blogDetailsHeartIcon"/>
              {item.likes} likes
            </span>
            <span className="blogDetailsExtraItem">
              {item.length} mins read
            </span>
            <span className="blogDetailsExtraItem">{item.views} views</span>
            <p className="blogDetailsDate">
              13<span>JUN</span>
            </p>
          </div>
          <span className="blogDetailsExtraRight">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
