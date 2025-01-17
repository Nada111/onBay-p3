import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      phoneNumber: '',
      email: '',
      errors: {}
    }
  }
  componentDidMount() {
    console.log("profile");
    
    const token = localStorage.usertoken
    if(token){
      const decoded = jwt_decode(token)
    
    console.log(decoded)
    console.log(this.state.first_name);
    // console.log("fffffff");
    this.setState(decoded.user)
    }else{
      this.props.history.push('/CustomerLogin')
    }
    
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Owner PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{this.state.phoneNumber}</td>
              </tr>
              <tr>
                <td>Change Password</td>
                <td><div class="button_cont" align="center"><a class="example_a" href="/ChangePassword" target="_blank" rel="nofollow noopener">Change Password</a></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Profile