import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login(props) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function notify(text){
        toast(text);
      }

    function handleSubmit(event) {
        debugger
        const data = {
            email,
            password
        }
        axios.post('http://localhost:8080/authenticate', data)
      .then(res => {
          debugger
        notify("Welcome!")
        console.log('User authenticated')
        localStorage.setItem('sessionUser',JSON.stringify(res.data))
        props.history.push('/dashboard')
      }).catch (error => {
          notify("Invalid credentials!")
      })
        event.preventDefault();
    }
    

    return (
        <div className="Login">
            <div align="center">
            <h3>Issue Tracking System</h3>
            <ToastContainer />            
            </div>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}
