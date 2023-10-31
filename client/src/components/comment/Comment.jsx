import React, { useContext } from "react";
import "./Comment.css";

import { userContext } from "../../context/UserContext";

import dayjs from "dayjs";

function Comment({ comment, deleteComment }) {
  const { user } = useContext(userContext);

  return (
    <div className="comment">
      <div className="commentImage">
        <img src={comment.authorId.image} alt="" />
      </div>
      <div className="commentMain">
        <div className="commentMainHeader">
          <h2 className="commentTitle">{comment.authorId.fullname}</h2>
          <div className="commentMainHeaderRight">
            <span className="commentDate">
              {dayjs(comment.date).format("MMM DD, YYYY")}
            </span>
            <button className="commentReplyBtn">Reply</button>
            {user?._id === comment.authorId._id ? (
              <button className="commentDeleteBtn" onClick={() => deleteComment(comment._id)}>DELETE</button>
            ) : (
              ""
            )}
          </div>
        </div>
        <p className="commentText">{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;
