import React from "react";
import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({ page, totalPages, setCurrentPage }) {
  const pages = () => {
    let arr = [];

    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }

    return arr;
  };

  return (
    <div className="pagination">
      <span>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => setCurrentPage(page - 1)}
        />
      </span>
      {pages().map((item) => {
        return (
          <span
            key={item}
            className={`${page === item ? "active" : ""}`}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </span>
        );
      })}
      <span>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => setCurrentPage(page + 1)}
        />
      </span>
    </div>
  );
}

export default Pagination;
