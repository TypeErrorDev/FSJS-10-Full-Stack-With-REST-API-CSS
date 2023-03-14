import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/courses">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              <Link to="/signup">Sign Up </Link>|
              <Link to="/signin"> Sign In</Link>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
