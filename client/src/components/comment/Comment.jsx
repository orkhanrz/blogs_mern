import React from "react";
import "./Comment.css";

import dayjs from "dayjs";

function Comment({comment}) {
  return (
    <div className="comment">
      <div className="commentImage">
        <img
          src={comment.authorId.image}
          alt=""
        />
      </div>
      <div className="commentMain">
        <div className="commentMainHeader">
          <h2 className="commentTitle">{comment.authorId.fullname}</h2>
          <div className="commentMainHeaderRight">
            <span className="commentDate">{dayjs(comment.date).format("MMM DD, YYYY")}</span>
            <button className="commentReplyBtn">Reply</button>
          </div>
        </div>
        <p className="commentText">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

export default Comment;
