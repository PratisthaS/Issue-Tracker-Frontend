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

export default class Issues extends React.Component {

  //only UI is designed for this page. Need to hookup with backend.

  constructor(props){
    super(props)
    this.state = {

      name: '',
      description: '',
      type:'Bug',
      priorityLevel:'HIGH',
      dueDate:'',
      project:'',
      assignee:'',
      issueList: [],
      projectList: [],
      assigneeList:[]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.issueType = ["Bug","Task"]
    this.priorityLevel = ["HIGH","LOW","MEDIUM"]
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  componentDidMount(){
    this.fetchUsers()
    this.fetchIssues()
    this.fetchProjects()
  }

  fetchUsers() {
    axios.get("http://localhost:8080/users").then(res => {
      this.setState({assigneeList: res.data})
    })
  }

  fetchIssues(){
    axios.get("http://localhost:8080/issues").then(res =>{
      this.setState({
        issueList:res.data
      })
    })
  }
  fetchProjects(){
    axios.get("http://localhost:8080/projects").then(res =>{
      this.setState({projectList:res.data})
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

  handleSubmit (event) {
    const issueDto = {
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      priorityLevel: this.state.priorityLevel,
      dueDate: this.state.dueDate.toISOString().slice(0,10),
      assignee: this.state.assignee,
      project: this.state.project,
      creator: 1 //will need to set it from session
    };
    axios.post('http://localhost:8080/issues', issueDto)
    .then(res => {
      alert('Issue added successfully!')
    })

  };

  handleChange = date => {
    this.setState({
      dueDate: date
    });
  };

  handleButtonClick = (state) => {
    
    console.log('clicked');
    console.log(state.target.id);

  };

  
    render() {

      const data = this.state.issueList;
      const columns = [
        {
      
          cell: (row) => <button onClick={this.handleButtonClick} id={row.id}>Action</button>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
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
          selector: 'project',
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
                <h1>Issue Tracker</h1>
            </AppBar>
          <h3>Create Issues</h3>
          <form onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="nameInput">Name: </label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control" id="nameInput" placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label><br/>
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
              <select id="type" name="type" onChange = {event => {this.setState({type:event.target.value})}}>
          {this.issueType.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority: </label>
              <select id="priority" name="type" onChange = {event => {this.setState({priority:event.target.value})}}>
              {this.priorityLevel.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
        </select>
            </div>

            <div className="form-group">
              <label htmlFor="project">Select Project: </label>
              <select id="project" name="project" onChange = {event => {this.setState({project:event.target.value})}}>
                {this.state.projectList.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="assignee">Select Assignee: </label>
              <select id="assignee" name="assignee" onChange = {event => {this.setState({assignee:event.target.value})}}>
                {this.state.assigneeList.map((item) => <option key={item.id} value={item.id}>{item.firstname}</option>)}
              </select>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>

          <DataTable
              title="List of Issues"
              columns={columns}
              data={data}
          />
          </div>


      )
    }
  }
