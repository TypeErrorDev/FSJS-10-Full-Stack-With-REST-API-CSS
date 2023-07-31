import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [user, setUser] = useState(cookie ? JSON.parse(cookie) : null);

  const navigate = useNavigate();

  //Sign-in by passing the emailAddress and password to the api
  const userSignIn = async (emailAddress, password) => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${emailAddress}:${password}`),
      },
    };

    await fetch("http://localhost:5000/api/users", fetchOptions)
      .then((res) => {
        // user authenticated and returns user data
        if (res.status === 200) {
           let user = res.json();
          setUser(user);
          Cookies.set("authenticatedUser", JSON.stringify(user), {
            expires: 1,
          });
          console.log(res.status);
          navigate("/");
          return user;
        } else if (res.status === 401) {
          return null;
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          //Set data for current user in global state
          setUser(data);
          setUser((prevState) => ({ ...prevState, password: password }));
          console.log(user);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const userSignOut = () => {
    setUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        actions: {
          userSignIn: userSignIn,
          userSignOut: userSignOut,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
