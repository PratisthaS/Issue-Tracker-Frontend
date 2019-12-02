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

export default class User extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            middleName: '',
            lastName: '',
            project: '',
            email: '',
            role: '',
            projectList: [],
            roleList:[],
            userList: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        this.fetchProjects()
        this.fetchRoles()
        this.fetchUsers()
    }
    fetchUsers(){
        axios.get("http://localhost:8080/users").then(res =>{
            this.setState({
                userList:res.data
            })
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



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit (event) {
        const userDto = {
            firstname: this.state.firstname,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            projectId: this.state.project,
            email: this.state.email,
            roleId: this.state.role
        };
        axios.post('http://localhost:8080/users', userDto)
            .then(res => {
                alert('User added successfully!')
            })
        event.preventDefault();
    };

    handleButtonClick = (state) => {
    
        console.log(state.target.id);
        this.props.history.push('/edit-roles/'+state.target.id)
     
    
      };



    render() {
        const data = this.state.userList;
        const columns = [
            {
      
                cell: (row) => <button onClick={this.handleButtonClick} id={row.id}>Action</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
              },
            {
                name: 'FirstName',
                selector: 'firstname',
                right: true,
            },
            {
                name: 'LastName',
                selector: 'lastName',
                right: true,
            },
            {
                name: 'Email',
                selector: 'email',
                right: true,
            },
        ];


        return (
            <div>
                <AppBar color="primary" position="static">
                    <h1>User Tracker</h1>
                </AppBar>
                    <h3>Add Users</h3>
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="firstname">First Name: </label>
                            <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} className="form-control" id="nameInput" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name: </label>
                            <input type="text" name="middleName" value={this.state.middleName} onChange={this.handleInputChange} className="form-control" id="middlenameInput" placeholder="Middle Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name: </label>
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} className="form-control" id="lastnameInput" placeholder="Last Name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control" id="emailInput" placeholder="Email" />
                        </div>

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

                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>
                <DataTable
                    title="List of Users"
                    columns={columns}
                    data={data}
                />
            </div>


    )
    }
    }
