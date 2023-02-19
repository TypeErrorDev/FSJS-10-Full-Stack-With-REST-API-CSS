import React from "react";

const Form = () => {
  return (
    <div>
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <form>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              defaultValue
            />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" defaultValue />
            <button className="button" type="submit">
              Sign In
            </button>
            <button
              className="button button-secondary"
              onClick="event.preventDefault(); location.href='index.html';"
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Form;
