import React from "react";
import { Redirect, Route ,Switch} from "react-router-dom";
import Userupdate from "./User/Userupdate";

function PrivateRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAuth = localStorage.getItem("isAuth");
  const isAdmin = localStorage.getItem("isAdmin");
  console.log("this", isAuthenticated);
  console.log("this", isAuth)
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/adminLogin" />
      }
      /> 
  ); 
}
export default PrivateRoute;