import { Component} from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Header from "./Header";
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom';


class Dashboard extends Component{
    state = {
       customers:[],
       searchTerm:"",
       perPage: 4,
       page: 0,
       pages: 0,     
}

editSearchTerm=(e)=>{
this.setState({searchTerm:e.target.value})
}

componentDidMount(){
    let axiosConfig = {
        withCredentials: true,
      }
    axios.get("http://localhost:90/users",axiosConfig)
    .then((response)=>{
        console.log(response)
        const customerlist=response.data.data
        this.setState({
            customers : response.data.data,
            pages: Math.floor(customerlist.length / this.state.perPage)
        })
    })
    .catch((err)=>{
        console.log(err.response)
    })
}

handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  }

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

renderTableData() {
    const {page, perPage, customers} = this.state;
    let items = customers.slice(page * perPage, (page + 1) * perPage);
    return items.map((customer) => {
      console.log(customer)
      if(this.state.searchTerm!=="" && customer.fullname.toLowerCase().indexOf(this.state.searchTerm.toLowerCase())===-1 &&
      customer.email.toLowerCase().indexOf(this.state.searchTerm.toLowerCase())===-1 &&
      customer.phone.toLowerCase().indexOf(this.state.searchTerm.toLowerCase())===-1 ){
        return null
    }
       return (
          <tr key={customer._id}>
            <td>{customer._id}</td>
            <td><img height="50px" width="50px" src={`http://localhost:90/uploads/${customer.image}`}/></td>
            <td>{customer.fullname}</td>
            <td>{customer.bio}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.companyname}</td>
            <td>{customer.website}</td>
            <td>{customer.facebook}</td>
            <td>{customer.instagram}</td>
            <td>{customer.twitter}</td>
            <td>{customer.youtube}</td>
          </tr>
       )
    })
 }

    render(){ 
        const {pages} = this.state;
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
                    <input className="searchbar" type= 'text'  onChange = {this.editSearchTerm} placeholder = 'Search'/>
                </nav>
                <br></br>
                <Table responsive id='students'>
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Full NAME</th>
                      <th>Bio</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company Name</th>
                      <th>Website</th>
                      <th>Facebook</th>
                      <th>Instagram</th>
                      <th>Twitter</th>
                      <th>Youtube</th>  
                    </tr>
                      {this.renderTableData()}
                  </tbody>
                </Table>
                <ReactPaginate
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  pageCount={this.pages}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                />
         </div>                                     
        )}
}
export default Dashboard;

