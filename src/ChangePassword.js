import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';


export default function ChangePassword(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password ==confirmPassword;
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
                console.log('User authenticated')
                localStorage.setItem('sessionUser',JSON.stringify(res.data))
                props.history.push('/')

            }).catch (error => {
            debugger
            alert("User could not be authenticated")
        })
        event.preventDefault();
    }

    return (
        <div className="Login">
            <div align="center">
                <h3>Issue Tracking System</h3>
            </div>
            <form onSubmit={handleSubmit}>


                <label>Email: {"User currently in session"}</label> <br/>


                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="Confirmpassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
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
