import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../blog/Blog.css";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../context/UserContext";
import { blogsContext } from "../../context/BlogsContext";

function Blog({ item }) {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const {reloadBlogs} = useContext(blogsContext);
  const [liked, setLiked] = useState({
    state: item.likes.users.includes(user?._id),
    count: item.likes.count,
  });

  const date = {
    day: dayjs(item.date).format("D"),
    month: dayjs(item.date).format("MMM"),
  };

  function likePost() {
    if (!user) {
      navigate("/signin");
      return;
    }

    fetch(`/api/blogs/${item._id}/likes/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        data.success &&
          setLiked((prevState) => ({
            ...prevState,
            count: prevState.state ? prevState.count - 1 : prevState.count + 1,
            state: !prevState.state,
          }));

          reloadBlogs();
      })
      .catch((err) => console.log(err));
  }

  function redirect() {
    navigate(`/blogs/${item._id}`);
  }

  return (
    <div className="blogItem">
      <div className="blogImage" onClick={redirect}>
        <img src={item.image} alt="" />
      </div>
      <div className="blogDetails">
        <div className="blogDetailsMain">
          <span className="blogCategory">{item.category}</span>
          <h1 className="blogTitle" onClick={redirect}>
            {item.title}
          </h1>
          <p className="blogDescription">{item.subtitle}</p>
        </div>
        <div className="blogDetailsExtra">
          <div className="blogDetailsExtraLeft">
            <span className="blogDetailsExtraItem">
              <FontAwesomeIcon
                icon={faHeart}
                className={`blogDetailsHeartIcon ${
                  liked.state ? "liked" : ""
                }`}
                onClick={likePost}
              />
              {liked.count} likes
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
            <FontAwesomeIcon icon={faArrowRight} onClick={redirect} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
