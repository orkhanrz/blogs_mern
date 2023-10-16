import React from "react";
import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination() {
  return (
    <div className="pagination">
      <span className="active">1</span>
      <span>2</span>
      <span>
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </div>
  );
}

export default Pagination;
