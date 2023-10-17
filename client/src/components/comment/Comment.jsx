import React from "react";
import "./Comment.css";

function Comment() {
  return (
    <div className="comment">
      <div className="commentImage">
        <img
          src="https://malina.artstudioworks.net/wp-content/uploads/2018/11/daria-shevtsova-blue-concrete-daylight-1182702-160x160.jpg"
          alt=""
        />
      </div>
      <div className="commentMain">
        <div className="commentMainHeader">
          <h2 className="commentTitle">Adam Brooks</h2>
          <div className="commentMainHeaderRight">
            <span className="commentDate">Nov 22, 2018</span>
            <button className="commentReplyBtn">Reply</button>
          </div>
        </div>
        <p className="commentText">
          Aliquam tempus tempor nisl, hendrerit ultrices risus laoreet et. Fusce
          nibh lacus, ullamcorper sodales sit amet, gravida lacinia sem. Orci
          varius natoque penatibus et magnis dis parturient montes. Sed
          ullamcorper pretium nibh vel pellentesque. Donec eu pharetra dui, sit
          amet blandit nisl.
        </p>
      </div>
    </div>
  );
}

export default Comment;
