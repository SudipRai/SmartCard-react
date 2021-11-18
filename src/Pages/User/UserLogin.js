import { Component } from "react"
import axios from 'axios';
import OTPform from "./OTPform";
import '../customcss/custom.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class UserLogin extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            hidden:true,
            forms:true,
            

        }
    this.toggleShow=this.toggleShow.bind(this)   
    }

 

    inputHandler =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    toggleShow(){
        this.setState({
            hidden: !this.state.hidden
        })
    }

    switchForm(){
        this.setState({
            forms: !this.state.forms
        })
    }
  
    login=(e)=>{
        e.preventDefault()
        let axiosConfig = {
            withCredentials: true,
          }
        axios.post("http://localhost:90/userLogin", this.state,axiosConfig)
        .then((response)=>{
            console.log(response);
            localStorage.setItem("isAuth", true);
            window.location.href = '/userupdate'
        })        
        .catch((err)=>{
            console.log(err)
           toast.error(`${err.response.data.message}`,{autoClose:3000})
        })
    }

    forgotpass=(e)=>{
        e.preventDefault()
        let axiosConfig = {
            withCredentials: true,
          }
          if(this.state.email===""){
            toast.error("Enter email",{autoClose:3000}) 
          }
          else{
        axios.post("http://localhost:90/forgot-password", this.state,axiosConfig)
        .then((response)=>{
            console.log(response); 
            this.switchForm()   
            toast.success(`${response.data.message}`,{autoClose:3000})   
        })        
        .catch((err)=>{
           toast.error(`${err.response.data.message}`,{autoClose:3000})  
        })
    }
    }

    
    render(){   
        return( 
            <div className="container body">
                <div className="row" >
                    <div className="col-md-6 side-logo">
                        <div className="logo-img">
                            <img src="../orange.png"></img>
                        </div>   
                    </div>
                    <div className="col-md-6 side-logo1 ">
                        <img className="small-logo" src="../orange.png"></img>
                        { this.state.forms ? <form className="loginform">
                            <div class="form-group">
                                <input type="text" required autoComplete="off" className="form-control logintext"  onChange={this.inputHandler} placeholder="Email" name="email" />
                                </div>
                            <hr class="hr-2"></hr>
                                <div class="form-group">
                                <input type={this.state.hidden ? "password":"text"} autoComplete="off" className="form-control logintext" id="myInput" onChange={this.inputHandler} placeholder="Password" name="password" required/>   
                            </div>
                            <hr className="hr-2"></hr>
                            <div className="check">
                                <input type="checkbox"  onClick={this.toggleShow}/>
                                <p>Show Password</p>
                            </div>
                            <button type="submit" onClick={this.login} className="btnlogin">Login</button>
                            <p className="forgot-pass" onClick={this.forgotpass}>Forgot Password?</p>
                        </form>
                         : <OTPform email={this.state.email}/>
                         }
                    </div>
                </div>
          </div> 
        )
    }
}

export default UserLogin