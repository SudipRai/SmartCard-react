import { Component } from "react"
import axios from 'axios';
import '../customcss/custom.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class ChangePassword extends Component{
    constructor(props){
        super(props)
        this.state={
            npassword:"",
            opassword:"",
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
  
    changepass=(e)=>{
        e.preventDefault();
        let axiosConfig = {
            withCredentials: true,
          }
        if(this.state.npassword!==0 && this.state.cpassword!==0 && this.state.npassword===this.state.cpassword){
        axios.put("http://localhost:90/change-password", this.state,axiosConfig)
        .then((response)=>{
            window.location.href = '/userupdate'       
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
                                <input type={this.state.hidden ? "password":"text"}autoComplete="off" className=" logintext"  onChange={this.inputHandler} placeholder="Recent Password" name="opassword" required=""/>
                            </div>
                            <hr class="hr-2"></hr>
                            <div class="form-group">
                                <input type={this.state.hidden ? "password":"text"}autoComplete="off" className=" logintext"  onChange={this.inputHandler} placeholder="New Password" name="npassword" required=""/>
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
                            <button type="submit" onClick={this.changepass} className=" btnlogin">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div> 
        )}
}

export default ChangePassword