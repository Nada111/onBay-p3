import 'bootstrap/dist/css/bootstrap.min.css';
import {  Form, Button,
} from 'react-bootstrap'
import React, { Component } from 'react'
import { register }  from '../functionAuth/functionAuth'



export default class CustomerSignUp extends Component {
    state ={}


onChangHandler=(e)=>{
    this.setState({
        [e.target.name] : e.target.value,
        type: 1
    })
}
onSubmitHandelr =(e)=>{
    e.preventDefault()
    register(this.state)
    this.props.history.push('/CustomerLogin')
}
    render() {
      

        return (
           <div className= "formcontainer">
                <div className="top">SIGN UP</div>
            <div className="form">
             <Form onSubmit ={this.onSubmitHandelr}>
                
                <Form.Group controlId="Firstname">
                     <Form.Control type="string" placeholder=" First Name"  name ="firstname" 
                     onChange = {this.onChangHandler}/>
                 </Form.Group>
                 <Form.Group controlId="Lastname">
                     <Form.Control type="string" placeholder=" Last Name"  name ="lastname" 
                     onChange = {this.onChangHandler}/>
                 </Form.Group>
                 <Form.Group controlId="PhoneNumber">
                     <Form.Control type="string" placeholder=" Phone Number"  name ="phonenumber" 
                     onChange = {this.onChangHandler}/>
                 </Form.Group>
             
                 <Form.Group controlId="formBasicEmail">
                     <Form.Control type="email" placeholder="Enter Email"  name ="email" 
                     onChange = {this.onChangHandler}/>
                 </Form.Group>
                 <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name ="password" 
                     onChange = {this.onChangHandler}/>
                </Form.Group>
                <div className="btnn">
                <Button variant='secondary' type="submit">
                   Sign Up
                </Button>
                </div>
             </Form>   
            </div>
            </div>
        )
    }
}
