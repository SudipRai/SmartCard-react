import { Component } from "react";
import {Route} from 'react-router-dom'
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import UserLogin from "./User/UserLogin";
import Userupdate from "./User/Userupdate";
import UserProfile from "./User/UserProfile";
import OTPform from "./User/OTPform";
import resetPassword from "./User/resetPassword";
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';
import ChangePassword from "./User/ChangePassword";
import AddUser from "./Admin/AddUser";


function Container(){
        return(
            <div>
                <Route path="/adminLogin" component={AdminLogin}/> 
                <PrivateRoute exact path="/dashboard" component={Dashboard}/> 
                <Route path="/userLogin" component={UserLogin}/> 
                <Route path="/userprofile/:id" component={UserProfile}/>  
                <Route path="/otpform/:email" component={OTPform}/> 
                <PrivateRoute path="/adduser" component={AddUser}/> 
                <ProtectedRoute exact path="/password-reset" component={resetPassword}/>  
                <ProtectedRoute exact path='/userupdate'  component={Userupdate} />
                <ProtectedRoute exact path='/change-password'  component={ChangePassword} />    
            </div>
        )
    }
export default Container