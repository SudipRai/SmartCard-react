import { Component } from "react"
import axios from 'axios';
class AdminLogin extends Component{
    state={
        fullname:"",
        password:""   
    }

    inputHandler =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    login=(e)=>{
        e.preventDefault();
        let axiosConfig = {
            withCredentials: true,
          }
        axios.post("http://localhost:90/adminLogin", this.state,axiosConfig)
        .then((response)=>{
            console.log(response);
            //setting token and userid into localstorage
            localStorage.setItem('isAdmin',"true")
            window.location.href = '/dashboard'
        })        
        .catch((err)=>{
            console.log(err.response)
        })
    }

    render(){
        return(
            <div className="col-md-6 container form">
            <h2>Admin Login</h2>
            <form>
              <div class="form-group">
                <label for="username">Full Name:</label>
                <input type="text" className="form-control" id="email"  onChange={this.inputHandler} placeholder="Enter email" name="fullname" required=""/>
              </div>
              <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="text" className="form-control" id="pwd" onChange={this.inputHandler} placeholder="Enter password" name="password" required=""/>
              </div>
              <button type="submit" onClick={this.login} class="btn btn-info m-2">Submit</button>
            </form>
          </div> 
        )
    }
}
export default AdminLogin