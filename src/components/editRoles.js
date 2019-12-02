import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AppBar from '@material-ui/core/AppBar';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class EditRoles extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user: {},
            projectList: [],
            roleList:[],
            project:'',
            role:''

        }
    }

    editRoles = (event)=>{
        const data = {
            projectId: this.state.project,
            id: this.state.user.id,
            roleId: this.state.role 
        }
        axios.post('http://localhost:8080/editroles', data)
        .then(res => {
            console.log("User roles updated")
    })
    event.preventDefault()
    }

    fetchUser(id){
        axios.get(`http://localhost:8080/users/${id}`).then(res => {
            this.setState({user:res.data})
        })
    }
    fetchProjects(){
        axios.get("http://localhost:8080/projects").then(res =>{
            this.setState({projectList:res.data})
        })
    }

    fetchRoles(){
        axios.get("http://localhost:8080/roles").then(res =>{
            this.setState({roleList:res.data})
        })
    }

    componentDidMount(){
        const { userId } = this.props.match.params
        this.fetchRoles()
        this.fetchProjects()
        this.fetchUser(userId)
    }

    render(){
        return (
            <div>
                <h3>Edit Roles</h3>
                <div>
                <form onSubmit={this.editRoles} >
                    <label>User: {this.state.user.firstname}</label> <br/>
                    <label>Email: {this.state.user.email}</label>

                    <div className="form-group">
                            <label htmlFor="role">Select Project: </label>
                            <select id="project" name="project" onChange = {event => {this.setState({project:event.target.value})}}>
                                {this.state.projectList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Select Role: </label>
                            <select id="role" name="role" onChange = {event => {this.setState({role:event.target.value})}}>
                                {this.state.roleList.map((item) => <option key={item.id} value={item.id}>{item.description}</option>)}
                            </select>
                        </div>
                    <br/> <br/>
                    <input type="submit" value="Submit" className="btn btn-primary" />

                    </form> 
                </div>
            </div>
        )
    }

}
