import React from "react";
import { useNavigate } from "react-router-dom";
import "../blog/Blog.css";
import dayjs from 'dayjs';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

function Blog({ item }) {
  const date = {
    day: dayjs(item.date).format('D'),
    month: dayjs(item.date).format('MMM')
  }

  const navigate = useNavigate();

  function redirect(){
    navigate(`/blogs/${item._id}`, {state: {_id: item._id}});
  };

  return (
    <div className="blogItem">
      <div className="blogImage" onClick={redirect}>
        <img src={item.image} alt="" />
      </div>
      <div className="blogDetails">
        <div className="blogDetailsMain">
          <span className="blogCategory">{item.category}</span>
          <h1 className="blogTitle" onClick={redirect}>{item.title}</h1>
          <p className="blogDescription">{item.subtitle}</p>
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
              {date.day} <span>{date.month}</span>
            </p>
          </div>
          <span className="blogDetailsExtraRight">
            <FontAwesomeIcon icon={faArrowRight} onClick={redirect}/>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
