import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AppBar from '@material-ui/core/AppBar';
import "./Component.css";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'

export default class Issues extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      type: 'Bug',
      priorityLevel: 'HIGH',
      dueDate: '',
      project: { id: 1 },
      assignee: '',
      issueList: [],
      projectList: [],
      assigneeList: [],
      myIssues:[]
    };
    this.sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    this.userList = []
    this.handleInputChange = this.handleInputChange.bind(this);
    this.issueType = ["Bug", "Task"]
    this.priorityLevel = ["HIGH", "LOW", "MEDIUM"]
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  notify = (text) => {
    toast(text);
  }


  componentDidMount() {
    if (localStorage.getItem("sessionUser")==null){
      this.notify("Please login first");
      setTimeout(() => {
        this.props.history.push('/');
      }, 2000);      
    }else{
    this.fetchIssues()
    this.fetchProjects()
    this.fetchUsers()
    }

  }

  fetchUsers() {
    axios.get("http://localhost:8080/users").then(res => {
      this.userList = res.data
      var assignees = this.userList.filter(item =>
        item.projectsInvolved.includes(this.state.project))
      this.setState({ assigneeList: assignees })
    })
  }

  fetchIssues() {
    axios.get("http://localhost:8080/issues").then(res => {
      this.setState({
        issueList: res.data.filter(item=>item.assignee!=null)
      })
      var myIssues = this.state.issueList.filter(item=>
        item.assignee.id==this.sessionUser.id)
        this.setState({myIssues:myIssues})
    })
  }

  fetchProjects() {
    axios.get("http://localhost:8080/projects").then(res => {
      this.setState({
        projectList: res.data,
        project: res.data[0].id
      })

    })
  }

  handleProjectChange = (event) => {
    var assignees = this.userList.filter(item => {
      if (item.projectsInvolved.includes(Number(event.target.value)))
        return item
    }

    )
    this.setState({ assigneeList: assignees })
    this.setState({ project: event.target.value })
    if (assignees.size > 0)
      this.setState({ assignee: assignees[0].id })


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

    const issueDto = {
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      priorityLevel: this.state.priorityLevel,
      dueDate: this.state.dueDate.toISOString().slice(0, 10),
      assignee: this.state.assignee,
      project: this.state.project,
      creator: 1 //will need to set it from session
    };

    axios.post('http://localhost:8080/issues', issueDto)
      .then(res => {
        console.log('Issue added successfully!')
        this.notify("Issue added successfully")

        this.fetchIssues();
        this.setState({
          name: '',
          description: '',
          type: 'Bug',
          priorityLevel: 'HIGH',
          dueDate: '',
          project: { id: 1 },
          assignee: '',
          issueList: []
        });
      })
    event.preventDefault();

  };

  handleChange = date => {
    this.setState({
      dueDate: date
    });
  };

  handleButtonClick = (state) => {

    console.log('clicked');
    console.log(state.target.id);
    this.props.history.push('/issue-detail/' + state.target.id)
  };


  render() {

    const data = this.state.issueList;
    const myData = this.state.myIssues;
    const columns = [
      {

        cell: (row) => <button onClick={this.handleButtonClick} id={row.id}>Detail</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: 'Issue Number',
        selector: 'id',
        right: true,
      },
      {
        name: 'Name',
        selector: 'name',
        right: true,
      },
      {
        name: 'Type',
        selector: 'issueType',
        right: true,
      },
      {
        name: 'Project',
        selector: 'project.name',
        right: true,
      },
      {
        name: 'PriorityLevel',
        selector: 'priorityLevel',
        right: true,
      },
      {
        name: 'DueDate',
        selector: 'dueDate',
        right: true,
      }
    ];

    return (
      <div>
        <AppBar color="primary" position="static">
          <h1>Issue Management</h1>
        </AppBar>
        <ToastContainer />

        <Tabs defaultActiveKey="assignedToMe" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Add new Issue">
            <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                <label htmlFor="nameInput">Name: </label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" id="nameInput" placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description: </label>
                <textarea name="description" value={this.state.description} onChange={this.handleInputChange} className="form-control" id="descInput" placeholder="Description" cols="40" rows="5"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="duedate">Date: </label>
                <DatePicker
                  selected={this.state.dueDate}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type: </label>
                <select id="type" name="type" onChange={event => { this.setState({ type: event.target.value }) }}>
                  {this.issueType.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority: </label>
                <select id="priority" name="type" onChange={event => { this.setState({ priority: event.target.value }) }}>
                  {this.priorityLevel.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project">Select Project: </label>
                <select id="project" name="project" onChange={this.handleProjectChange}>
                  {this.state.projectList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="assignee">Select Assignee: </label>
                <select id="assignee" name="assignee" onChange={event => { this.setState({ assignee: event.target.value }) }}>
                  {this.state.assigneeList.map((item) => <option key={item.id} value={item.id}>{item.firstname}</option>)}
                </select>
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </Tab>
          <Tab eventKey="profile" title="All Issues">
            <DataTable title="List of Issues"
              columns={columns}
              data={data}
            />
          </Tab>
          <Tab eventKey="assignedToMe" title="My Issues">
            <DataTable title="Issues assigned to me"
              columns={columns}
              data={myData}
            />
          </Tab>

        </Tabs>


      </div>


    )
  }
}
