import { Component} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

// updating the post uploaded by user
class Userupdate extends Component{
    state = {
        image:"",
        fullname:"",
        email:"",
        phone:"",
        address:"",
        companyname:"",
        bio:"",
        website:"",
        instagram:"",
        facebook:"",
        twitter:"",
        youtube:"",
        password:""
          
}
changeHandler = (e)=>{
    this.setState({
     [e.target.name] : e.target.value
    })   
}
fileHandler = (e)=>{
    this.setState({
        file : e.target.files[0]
    })
}

//getting the details of post
componentDidMount(){
  let axiosConfig = {
    withCredentials: true,
  }
    axios.get("http://localhost:90/customerData",axiosConfig)
    .then((response)=>{
        console.log(response)
        this.setState({
            image:response.data.data.image,
            fullname:response.data.data.fullname,
            email:response.data.data.email,
            phone:response.data.data.phone,
            companyname:response.data.data.companyname,
            bio:response.data.data.bio,
            address:response.data.data.address,
            website:response.data.data.website,
            facebook:response.data.data.facebook,
            instagram:response.data.data.instagram,
            twitter:response.data.data.twitter,
            youtube:response.data.data.youtube,
            password:response.data.data.password,
            
        })
    })
    .catch((err)=>{
        console.log(err.response)
    })
}

//updating the post
updateroom = (e)=>{
    e.preventDefault();
    let axiosConfig = {
      withCredentials: true,
    }
    const data = new FormData() 
    data.append('fullname', this.state.fullname)
    data.append('email', this.state.email)
    data.append('phone', this.state.phone)
    data.append('companyname', this.state.companyname)
    data.append('bio', this.state.bio)
    data.append('address', this.state.address)
    data.append('website', this.state.website)
    data.append('facebook', this.state.facebook)
    data.append('instagram', this.state.instagram)
    data.append('twitter', this.state.twitter)
    data.append('youtube', this.state.youtube)
    data.append('password', this.state.password)
    data.append('file', this.state.file)

    axios.put('http://localhost:90/profileUpdate',data,axiosConfig)
    .then((response)=>{
        console.log(response)
        alert("Updated")
    })
    .catch((err)=>{
        console.log(err.response)
    })
}
logout=()=>{
  let axiosConfig = {
    withCredentials: true,
  }
  axios.get('http://localhost:90/logout',axiosConfig)
  .then((response)=>{
    console.log(response)
    localStorage.clear()
    window.location.href ='/userLogin'
})
.catch((err)=>{
    console.log(err.response)
})
 
}
    
render(){
    return(
      //design form for update post
        <div>
            <div class="container-fluid">
		<div class="row">
			<div class="col-md-8">
	<form>
  <div class="form-row">
    <div class="form-group1 col-md-6">
      <label for="inputTitle">Fullname</label>
      <input type="text" name="fullname" class="form-control" value={this.state.fullname} onChange={this.changeHandler} id="inputTitle" required />
    </div>
    <div class="form-group1 col-md-6">
      <label for="inputproperty">Email</label>
      <input type="text" name="email" class="form-control" value={this.state.email} onChange={this.changeHandler} id="inputPassword4" />
    </div>
  </div>
  <div class="form-group1">
    <label for="inputRoomno">Phone</label>
    <input type="text" name="phone" class="form-control" value={this.state.phone} onChange={this.changeHandler} id="inputroomno"/>
  </div>
  <div class="form-group1">
    <label for="inputPrice">Company Name</label>
    <input type="text" name="companyname" class="form-control" value={this.state.companyname} onChange={this.changeHandler} id="inputPrice"/>
  </div>
  <div class="form-row">
    <div class="form-group1 col-md-6">
      <label for="inputCity">Bio</label>
      <input type="text" name="bio" class="form-control" value={this.state.bio} onChange={this.changeHandler} id="inputCity"/>
    </div>
     <div class="form-group1 col-md-4">
      <label for="inputDistrict">Address</label>
      <input type="text" name="address" class="form-control" value={this.state.address} onChange={this.changeHandler} id="inputDistrict"/>
    </div>
    <div class="form-group1 col-md-2">
      <label for="inputStreet">Website</label>
      <input type="text" name="website" class="form-control" value={this.state.website} onChange={this.changeHandler} id="inputStreet"/>
    </div>
  </div>
    <div class="form-group1">
    <label for="facility">Facebook</label>
    <input type="text" name="facebook" class="form-control" value={this.state.facebook} onChange={this.changeHandler} id="inputfacility"/>
  </div>
    <div class="form-group1">
    <label for="inputDesc">Instagram</label>
    <input type="text" name="instagram" class="form-control" value={this.state.instagram} onChange={this.changeHandler} id="inputdesc" />
  </div>
  <div class="form-group1">
    <label for="inputDesc">Twitter</label>
    <input type="text" name="twitter" class="form-control" value={this.state.twitter} onChange={this.changeHandler} id="inputdesc" />
  </div>
  <div class="form-group1">
    <label for="inputDesc">Youtube</label>
    <input type="text" name="youtube" class="form-control" value={this.state.youtube} onChange={this.changeHandler} id="inputdesc"/>
  </div>

  <button type="submit" onClick={this.updateroom} class="btn btn-primary btnadd">Update</button>
  <button type="submit" onClick={this.logout} className="btnlogin">Login</button>
  <Link to={'/change-password'}><button>Change Password</button></Link>
</form>
</div>
<div class="col-md-4">
	<img src={`http://localhost:90/uploads/${this.state.image}`}/>
</div>
<div class="form-group1">
		 	 <label for="inputTitle">Choose a picture</label><br></br>
           <input type="file" name="file" onChange={this.fileHandler}  multiple/>
        </div>
</div>
</div>
</div>
    )
}
}

export default Userupdate;