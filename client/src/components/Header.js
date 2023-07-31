import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <nav>
      {user === null ? (
        <>
          <header>
            <div className="wrap header--flex">
              <h1 className="header--logo">
                <Link to="/">Courses</Link>
              </h1>
              <nav>
                <React.Fragment>
                  <ul className="header--signedout">
                    <li>
                      <Link className="header--signedout" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link className="header--signedout" to="/signin">
                        Sign In
                      </Link>
                    </li>
                  </ul>
                </React.Fragment>
              </nav>
            </div>
          </header>
        </>
      ) : (
        <>
          <header>
            <div className="wrap header--flex">
              <h1 className="header--logo">
                <Link to="/">Courses</Link>
              </h1>
              <nav>
                <React.Fragment>
                  <ul className="header--signedin">
                    <li>
                      Welcome, {user.firstName} {user.lastName}!
                    </li>
                    <li>
                      <Link to="/signout">Sign Out</Link>
                    </li>
                  </ul>
                </React.Fragment>
              </nav>
            </div>
          </header>
        </>
      )}
    </nav>
  );
};


export default Header;
