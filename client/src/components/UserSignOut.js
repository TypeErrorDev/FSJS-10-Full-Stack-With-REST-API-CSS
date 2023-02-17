import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const UserSignOut = () => {
  let navigate = useNavigate();
  let user = useContext(UserContext);
  let { actions } = useContext(UserContext);

  useEffect(() => {
    actions.userSignOut(user);
    navigate("/");
  }, [actions, user, navigate]);
};

export default UserSignOut;
