import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const UserProvider = (props) => {
  // Set initial state
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Sign in and pass user data to state
  const userSignIn = async (emailAddress, password) => {
    // Make request to API
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
      },
    })
      .then((res) => {
        // If user is not authenticated, return error
        if (res.status === 401) {
          alert("Sign-in was unsuccessful");
          return navigate("/sign-in");
        } else {
          navigate("/");
          return res.json();
        }
      })
      .then((data) => {
        // If user is authenticated, set user data to state
        if (data.message) {
          console.log(data.message);
        } else {
          setUser(data);
          setUser((prevState) => ({ ...prevState, password: password }));
          console.log(user);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const userSignOut = (user) => {
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        actions: {
          userSignIn: userSignIn,
          userSignOut: userSignOut,
        },
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
