import React from "react";
import { Link } from "react-router-dom";

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
              <li>
                <a href="sign-up.html">Sign Up</a>
              </li>
              <li>
                <a href="sign-in.html">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
