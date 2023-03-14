import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import userContext from "./UserContext";
import Header from "./Header";

const UserSignIn = () => {
  let navigate = useNavigate();

  // deconstructs the actions from the UserProvider function in userContext
  let {actions} = useContext(userContext);

  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.userSignIn(emailAddress, password);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  
  return (
    <div>
      <Header/>
      <div className="form--centered">
        <h2>Sign In</h2>
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
