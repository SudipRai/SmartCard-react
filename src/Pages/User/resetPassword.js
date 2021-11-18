import { Component } from "react"
import axios from 'axios';
import '../customcss/custom.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class resetPassword extends Component{
    constructor(props){
        super(props)
        this.state={
            password:"",
            cpassword:"",
            hidden:true   
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
  
    resetpass=(e)=>{
        e.preventDefault();
        let axiosConfig = {
            withCredentials: true,
          }
        if(this.state.password!==0 && this.state.cpassword!==0 && this.state.password===this.state.cpassword){
        axios.put("http://localhost:90/reset-password", this.state,axiosConfig)
        .then((response)=>{
            localStorage.removeItem("isAuth")
            toast.success(`${response.data.message}`) 
            axios.delete("http://localhost:90/delete-token",axiosConfig)
            .then((response)=>{      
            })
            .catch((err)=>{
            })  
            window.location.href = '/userLogin'        
        })        
        .catch((err)=>{
           toast.error(`${err.response.data.message}`)  
        })
    }
    else{
        toast.error("Password did not match") 
    }
    }
   
    render(){       
        return(         
            <div className="container body">
                <div className="row" >
                    <div className="col-md-6 side-logo">
                        <img src="../orange.png"></img>
                    </div>
                    <div className="col-md-6 side-logo1 ">
                        <img className="small-logo" src="../orange.png"></img>
                        <form className="loginform">
                            <div class="form-group">
                                <input type={this.state.hidden ? "password":"text"}autoComplete="off" className=" logintext"  onChange={this.inputHandler} placeholder="New Password" name="password" required=""/>
                            </div>
                            <hr class="hr-2"></hr>
                            <div class="form-group">
                                <input type={this.state.hidden ? "password":"text"} autoComplete="off" className=" logintext" id="myInput" onChange={this.inputHandler} placeholder="Confirm Password" name="cpassword" required=""  />                      
                            </div>
                            <hr className="hr-2"></hr>                  
                            <div className="check">
                                <input type="checkbox"  onClick={this.toggleShow}/>
                                <p>Show Password</p>
                            </div>                    
                            <button type="submit" onClick={this.resetpass} className=" btnlogin">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div> 
        )}
}

export default resetPassword