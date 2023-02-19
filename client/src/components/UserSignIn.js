import React from "react";
import Header from "./Header";
import Form from "./Form";

const UserSignIn = () => {
  return (
    <div>
      <Header />
      <Form />
      <p className="form--centered">
        Don't have a user account? Click here to{" "}
        <a href="sign-up.html">sign up</a>!
      </p>
    </div>
  );
};

export default UserSignIn;
