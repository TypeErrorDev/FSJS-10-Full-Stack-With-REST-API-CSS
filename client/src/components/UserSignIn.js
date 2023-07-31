import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Header from "./Header";

const UserSignIn = () => {
  let navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // deconstructs the actions from the UserProvider function in userContext
  const { actions } = useContext(UserContext);
  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await actions.userSignIn(emailAddress, password);
      if (user) {
        navigate("/");
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <Header />
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length !== 0 ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
      <p className="form--centered">
        Don't have a user account? Click here to
        <Link to="/signup"> sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
