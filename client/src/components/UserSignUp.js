import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserProvider from "../components/UserContext";
import Header from "../components/Header"

const UserSignIn = () => {
  let navigate = useNavigate();



  let {actions} = useContext(UserProvider);

  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.userSignIn(emailAddress, password);
  };
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };


  return (
    <React.Fragment>
      <Header/>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" defaultValue/>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" defaultValue/>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" defaultValue/>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" defaultValue/>
          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary"
                  onClick={handleCancel}>Cancel
          </button>
        </form>
        <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
      </div>
    </React.Fragment>
  );
};

export default UserSignIn;
