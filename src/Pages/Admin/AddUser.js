import { Component } from "react"
import axios from 'axios';
import '../customcss/custom.css'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header'
toast.configure()

class AddUser extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            fullname:"",
            hidden:true,
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
  
    register=(e)=>{
        e.preventDefault()
        let axiosConfig = {
            withCredentials: true,
          }
          if(this.state.email!==""&&this.state.fullname!==""&&this.state.password!=="")
          {
        axios.post("http://localhost:90/register", this.state,axiosConfig)
        .then((response)=>{
            console.log(response);
            toast.success("Added Successfully")
            this.setState({
                email:"",
                password:"",
                fullname:"",
            })
        })        
        .catch((err)=>{
            console.log(err)
           toast.error(`${err.response.data.message}`,{autoClose:3000})
        })
    }
    else{
        toast.error("Input field is empty")
    }
    } 
    
    render(){   
        return( 
           <div>
                <Header/>
            <div className="container body">   
                <div className="row" >
                    <div className="col-md-6 side-logo">
                        <div className="logo-img">
                            <img src="../orange.png"></img>
                        </div>   
                    </div>
                    <div className="col-md-6 side-logo1 ">
                        <img className="small-logo" src="../orange.png"></img>
                        <form className="loginform">
                        <div class="form-group">
                                <input type="text" required autoComplete="off" className="form-control logintext"  onChange={this.inputHandler} placeholder="Fullname" name="fullname" />
                                </div>
                            <hr class="hr-2"></hr>
                            <div class="form-group">
                                <input type="email" required autoComplete="off" className="form-control logintext"  onChange={this.inputHandler} placeholder="Email" name="email" />
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
                            <button type="submit" onClick={this.register} className="btnlogin">Add</button>
                        </form>
                    </div>
                </div>
          </div> 
          </div>
        )
    }
}

export default AddUser