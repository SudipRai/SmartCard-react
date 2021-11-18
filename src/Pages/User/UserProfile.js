import { Component} from "react";
import axios from 'axios';
import fileDownload from 'js-file-download'

class UserProfile extends Component{
    state = {
    id:this.props.match.params.id,
       customer:{},   
}

componentDidMount(){
    axios.get("http://localhost:90/userProfile/"+this.state.id)
    .then((response)=>{
        console.log(response)
        this.setState({
            customer : response.data.data
        })
    })
    .catch((err)=>{
        console.log(err.response)
    })
}

download = (filename)=>{
    
    axios.get('http://localhost:90/download/'+this.state.id)
    .then((response)=>{
        console.log(response)
        fileDownload(response.data, filename)
           
    })
    .catch((err)=>{
        console.log(err.response)
    })
}

    render(){
        return(
            <div className="table-responsive">
            <table id="table" class="table" >
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
           
        
	                <tr>
                        <td>{this.state.customer._id}</td>
                        <td><img height="50px" width="50px" src={`http://localhost:90/uploads/${this.state.customer.image}`}/></td>
                        <td>{this.state.customer.fullname}</td>
                        <td>{this.state.customer.bio}</td>
                        <td>{this.state.customer.address}</td>
                        <td>{this.state.customer.email}</td>
                        <td>{this.state.customer.phone}</td>
                        <td>{this.state.customer.companyname}</td>
                        <td>{this.state.customer.website}</td>
                        <td>{this.state.customer.facebook}</td>
                        <td>{this.state.customer.instagram}</td>
                        <td>{this.state.customer.twitter}</td>
                        <td>{this.state.customer.youtube}</td>
                    </tr>  
                
                </table>
                <button type="submit" onClick={this.download.bind(this, "contact.vcf")}  className=" btnlogin" download>Download</button>
                </div>                               
        )}
}
export default UserProfile;

