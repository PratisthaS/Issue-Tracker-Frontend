import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword(props) {

    function notify(text){
        toast(text);
      }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");

    function validateForm() {
        return password.length > 0 && newPassword.length > 0;
    }

    

    function handleSubmit(event) {
        
        var email = currentUserEmail
        const data = {
            email,
            password,
            newPassword
        }
        axios.post('http://localhost:8080/changePassword', data)
            .then(res => {
                console.log('Password Changed')
                props.history.push('/dashboard')

            }).catch (error => {
            notify("Old password was incorrect! Password could not be changed")
        })
        event.preventDefault();
    }

    if (localStorage.getItem("sessionUser")==null){
        notify("Please login first");
        setTimeout(() => {
          props.history.push('/');
        }, 2000);      
    }else{
    

    var currentUserEmail = JSON.parse(localStorage.getItem('sessionUser')).email

    
}

    return (
        <div className="Login">
            <div align="center">
                <h3>Change Password</h3>
            </div>
            <form onSubmit={handleSubmit}>

            <ToastContainer />
                <label>Email: {currentUserEmail}</label> <br/>


                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Old Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="Newpassword" bsSize="large">
                    <FormLabel>New Password</FormLabel>
                    <FormControl
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Change Password
                </Button>
            </form>
        </div>
    );
    
}
