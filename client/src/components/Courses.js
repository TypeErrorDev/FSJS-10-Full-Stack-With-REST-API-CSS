import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

const Courses = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="wrap main--grid">
          <Link className="course--module course--link" to="/courses/1">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Build a Basic Bookcase</h3>
          </Link>
          <Link className="course--module course--link" to="/courses/2">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Learn How to Program</h3>
          </Link>
          <Link className="course--module course--link" to="/courses/3">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Learn How to Test Programs</h3>
          </Link>
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Courses;
