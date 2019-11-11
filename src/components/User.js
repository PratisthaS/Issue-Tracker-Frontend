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

    //Haven't connected with backend yet.

    constructor(props) {

        super(props);
        this.state = {

            id: '',
            name:'',
            email:'',
            userList: []

        };

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchUsers()
    }

    fetchUsers(){
        axios.get("http://localhost:8080/user").then(res =>{
            debugger
            this.setState({
                userList:res.data
            })
        })


    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleSubmit(event) {
        //alert('A form was submitted: ' + this.state.name + ' // ' + this.state.email);
        const user = {
            name: this.state.name,
            email: this.state.email
        };
        axios.post('http://localhost:8080/user', {name: this.state.name,
            email: this.state.email}
        )
            .then(res => {
                this.setState({
                    name: '',
                    email:''
                })
                this.fetchUsers();
                alert('User added successfully!')
            })

        event.preventDefault();
    }

    render() {

        const data = this.state.userList;
        const columns = [
            {
                name: 'Name',
                selector: 'name',
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
                <br/>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label for="nameInput">Name: </label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameInput" placeholder="User Name" />
                    </div>
                    <div className="form-group">
                        <label for="keyInput">Email: </label>
                        <input name="key" type="text" value={this.state.email} onChange={this.handleChange} className="form-control" id="emailInput" placeholder="Email"/>
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
