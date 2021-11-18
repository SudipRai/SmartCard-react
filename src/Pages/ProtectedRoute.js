import React from "react";
import { Redirect, Route ,Switch} from "react-router-dom";
import Userupdate from "./User/Userupdate";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuth = localStorage.getItem("isAuth");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/userLogin" />
      }
      /> 
  ); 
}
export default ProtectedRoute;