import { Component } from "react"
import axios from 'axios';
import {Link} from 'react-router-dom';
class Header extends Component{
  //logout
  logout=()=>{
    let axiosConfig = {
      withCredentials: true,
    }
    axios.get('http://localhost:90/adminLogout',axiosConfig)
    .then((response)=>{
      console.log(response)
      localStorage.clear()
      window.location.href= '/adminLogin'
  })
  .catch((err)=>{
      console.log(err.response)
  })
  }

    render(){
        return(
            <div>
                 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <img width="50px" height="50px" src="../oranze.png"></img>
                    <a class="navbar-brand" href="#">Oranze Innovation</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="/dashboard ">Customer Detail </a>
                        <Link to={'/adduser'}><button type="submit"  className="btn-dashboard">Add Customer</button></Link>
                        <button type="submit" onClick={this.logout} className="btn-dashboard">Logout</button>  
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header