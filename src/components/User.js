import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AppBar from '@material-ui/core/AppBar';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import "./Component.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    TextField
} from "@material-ui/core";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            middleName: '',
            lastName: '',
            project: '',
            email: '',
            role: '',
            projectList: [],
            roleList: [],
            userList: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    notify = (text) => {
        toast(text);
    }

    componentDidMount() {
        if (false){
            this.notify("Please login first");
            setTimeout(() => {
              this.props.history.push('/');
            }, 2000);      
          }
        else{
        this.fetchProjects()
        this.fetchRoles()
        this.fetchUsers()
        this.connect()
        }
    }

    fetchUsers() {
        axios.get("http://localhost:8080/users").then(res => {
            this.setState({
                userList: res.data
            })
        })
    }

    fetchProjects() {
        axios.get("http://localhost:8080/projects").then(res => {
            this.setState({ projectList: res.data })
        })

    }

    fetchRoles() {
        axios.get("http://localhost:8080/roles").then(res => {
            this.setState({ roleList: res.data })
        })
    }

    connect = () => {
        debugger
        var socket = new SockJS('http://localhost:8080/stat-websocket');
        this.stompClient = Stomp.over(socket);
        let that = this;
        this.stompClient.connect({}, frame => {
            this.stompClient.subscribe('/topic/stats', function (frame) {
                debugger
                let msg = "New User Added with email: "
                msg = msg + frame.body
                that.notify(msg)
            })
        })
    }

    disconnect = () => {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    };

    sendMessage = message => {
        const userDto = {
            firstname: this.state.firstname,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            projectId: this.state.project,
            email: this.state.email,
            roleId: this.state.role
        };
        debugger
        this.stompClient.send("/app/statistics", {}, JSON.stringify(userDto));
        console.log('User added successfully!')
            this.fetchUsers();
                this.notify('User added successfully');
                this.setState({
                    firstname: '',
                    middleName: '',
                    lastName: '',
                    project: '',
                    email: '',
                    role: '',
                    userList: []
                });
        message.preventDefault();
    };



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
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
                console.log('User added successfully!')
                this.fetchUsers();
                this.notify('User added successfully');
                this.setState({
                    firstname: '',
                    middleName: '',
                    lastName: '',
                    project: '',
                    email: '',
                    role: '',
                    userList: []
                });
            })

        event.preventDefault();
    };

    handleButtonClick = (state) => {

        console.log(state.target.id);
        this.props.history.push('/edit-roles/' + state.target.id)

    };



    render() {
        const data = this.state.userList;
        const columns = [
            {

                cell: (row) => <button onClick={this.handleButtonClick} id={row.id}>Edit</button>,
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
                    <h1>User Management</h1>
                </AppBar>
                <ToastContainer />

                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Add new User">
                        <form onSubmit={this.sendMessage} >
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
                                <select id="project" name="project" onChange={event => { this.setState({ project: event.target.value }) }}>
                                    {this.state.projectList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Select Role: </label>
                                <select id="role" name="role" onChange={event => { this.setState({ role: event.target.value }) }}>
                                    {this.state.roleList.map((item) => <option key={item.id} value={item.id}>{item.description}</option>)}
                                </select>
                            </div>

                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </form>
                    </Tab>
                    <Tab eventKey="profile" title="User List">
                        <DataTable
                            title="List of Users"
                            columns={columns}
                            data={data}
                        />
                    </Tab>
                </Tabs>
            </div>


        )
    }
}
