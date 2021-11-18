import { Component } from "react"
import axios from 'axios';
import '../customcss/custom.css'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


class OTPform extends Component{
    constructor(props){
        super(props)
        this.state={
            code:"",
            email:this.props.email,
        }
    }
    inputHandler =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
 
    sendOTP=(e)=>{
        e.preventDefault()
        let axiosConfig = {
            withCredentials: true,
          }
        console.log(this.state)
        axios.post("http://localhost:90/checkOTP", this.state,axiosConfig)
        .then((response)=>{
            console.log(response);
            localStorage.setItem('isAuth',true)
            window.location.href='/password-reset'
        })        
        .catch((err)=>{
            toast.error(`${err.response.data.message}`,{autoClose:3000})
        })
    } 

    render(){        
        return(           
           <form className="loginform">   
              <div class="form-group">
                <label><h5 style={{color:"#D7D7D7", float:"left", marginBottom:"30px"}}>Enter OTP</h5></label>
                <input type="text" required autoComplete="off" className="form-control logintext" onChange={this.inputHandler} placeholder="Code" name="code"/>
              </div>
              <hr class="hr-2"></hr>            
              <button type="submit" onClick={this.sendOTP} className=" btnlogin">Submit</button>
            </form>         
        )
    }
}

export default OTPform